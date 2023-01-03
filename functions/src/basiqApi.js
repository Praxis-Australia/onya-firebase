const { URLSearchParams } = require('url');
const fetch = require('node-fetch');
const admin = require("firebase-admin");
const functions = require("firebase-functions");

const getBasiqToken = async () => {
    const basiqDoc = await admin.firestore().collection('env').doc('basiqToken').get();

    try {
        if (basiqDoc.exists) {
            const basiqDocData = basiqDoc.data();
            if (basiqDocData.access_token && basiqDocData.last_updated && new Date().getTime() - basiqDocData.last_updated < 3300 * 1000) {
                functions.logger.log("returning cached basiq token")
                return basiqDocData.access_token;
            } else {
                return await refreshBasiqToken();
            }
        } else {
            return await refreshBasiqToken();
        }
    } catch (e) {
        functions.logger.error(e);
    }
};

const refreshBasiqToken = async () => {
    functions.logger.log("fetching new basiq token")
    const encodedParams = new URLSearchParams();
    encodedParams.set('scope', 'SERVER_ACCESS');

    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'basiq-version': '3.0',
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${process.env.BASIQ_API_KEY}`
        },
        body: encodedParams
    };

    const url = 'https://au-api.basiq.io/token';
    const res = await fetch(url, options);
    const json = await res.json();

    let writeResult = await admin.firestore().collection('env').doc('basiqToken').set({
        access_token: json.access_token,
        last_updated: new Date().getTime()
    })
    return json.access_token;
}

const createAuthLink = async (basiqUid) => {
    const url = `https://au-api.basiq.io/users/${basiqUid}/auth_link`;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: `Bearer ${await getBasiqToken()}`
        }
    };

    const res = await fetch(url, options);
    const json = await res.json();

    return json.links.public;
}

const createBasiqUser = async (uid, phoneNumber, firstName=null, lastName=null) => {
    try {
        let payload = {
            mobile: phoneNumber,
        };
        if (firstName) { payload.firstName = firstName; }
        if (lastName) { payload.lastName = lastName; }

        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${await getBasiqToken()}`
            },
            body: JSON.stringify(payload)
        };
    
        const url = 'https://au-api.basiq.io/users';
        const res = await fetch(url, options);
        const json = await res.json();
        functions.logger.log(`Succesfully created Basiq user ${json.id} with details`)
    
        return await admin.firestore().collection('users').doc(uid).update({
            basiq: {
                "configStatus": "BASIQ_USER_CREATED",
                "uid": json.id,
                "consentLink": await createAuthLink(json.id)
            },
        });
    } catch (err) {
        functions.logger.error(`Error updating user ${uid} with Basiq details`, err)
    }
}

const getConnectionIds = async (basiqUid) => {
    const url = `https://au-api.basiq.io/users/${basiqUid}/connections`;
    const options = {
        method: 'GET', 
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${await getBasiqToken()}`
        },
    };

    const res = await fetch(url, options);

    if (res.status == 200) {
        const json = await res.json();
        return json.data.map(connection => connection.id);
    } else {
        return "There was an error fetching connection IDs";
    }

}

const getAccounts = async (basiqUid) => {
    const url = `https://au-api.basiq.io/users/${basiqUid}/accounts`;
    const options = {
        method: 'GET', 
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${await getBasiqToken()}`
        },
    };

    const res = await fetch(url, options);

    if (res.status == 200) {
        const json = await res.json();
        const accounts = json.data
            .filter(account => account["status"] == "available")
            .map(account => ({
                id: account["id"],
                name: account["name"],
                institution: account["institution"],
                accountNumber: account["accountNo"],
            }))

        return accounts;
    } else {
        return "There was an error fetching account names";
    }
}

const refreshUserBasicInfo = async (uid) => {
    // Fetch corresponding user document from Firestore
    const userDoc = await admin.firestore().collection('users').doc(uid).get();

    if (userDoc.exists) {
        const userDocData = userDoc.data();
        if (userDocData.basiq.configStatus != "NOT_CONFIGURED") {
            const connectionIds = await getConnectionIds(userDocData.basiq.uid);
            const accounts = await getAccounts(userDocData.basiq.uid);
            await admin.firestore().collection('users').doc(uid).update({
                "basiq.connectionIds": connectionIds,
                "basiq.availableAccounts": accounts,
                "basiq.configStatus": (connectionIds != []) ? "COMPLETE" : "BASIQ_USER_CREATED"
            });
        }
    } else {
        functions.logger.error(`User ${uid} does not exist in Firestore`);
    }
}

exports.createBasiqUser = createBasiqUser;
exports.refreshUserBasicInfo = refreshUserBasicInfo;