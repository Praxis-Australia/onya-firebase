const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { URLSearchParams } = require('url');
const fetch = require('node-fetch');
const fs = require('fs');

let templateUserDoc = JSON.parse(fs.readFileSync('template_user_doc.json'));

admin.initializeApp();

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

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

const createUser = async (uid, phoneNumber) => {
    try {
        const writeResult = await admin.firestore().collection('users').doc(uid).set({
            ...templateUserDoc,
            uid: uid,
            userCreated: admin.database.ServerValue.TIMESTAMP,
        })

        functions.logger.log(`Success creating user ${uid}`);
        return writeResult;
    } catch (err) {
        functions.logger.error(`Error creating user ${uid}`, err)
    }
}

exports.createUser = functions.auth.user().beforeCreate(async (user, context) => {
    const { uid, phoneNumber } = user;
    return createUser(uid, phoneNumber);
})

exports.createUserBasiq = functions.auth.user().onCreate(async user => {
    const { uid, phoneNumber } = user;

    try {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${await getBasiqToken()}`
            },
            body: JSON.stringify({
                mobile: phoneNumber,
            })
        };
    
        const url = 'https://au-api.basiq.io/users';
        const res = await fetch(url, options);
        const json = await res.json();
    
        return await admin.firestore().collection('users').doc(uid).update({
            basiq: {
                "accountNames": [],
                "availableAccounts": [],
                "connectionIds": [],
                "uid": json.id,
                "consentLink": await createAuthLink(json.id)
            },
        });
    } catch (err) {
        functions.logger.error(`Error updating user ${uid} with Basiq details`, err)
    }
})

// exports.

// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into Firestore using the Firebase Admin SDK.
//     const writeResult = await admin.firestore().collection('messages').add({original: original});
//     // Send back a message that we've successfully written the message
//     res.json({result: `Message with ID: ${writeResult.id} added.`});
// });

// exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
//     .onCreate((snap, context) => {
//     // Grab the current value of what was written to Firestore.
//     const original = snap.data().original;

//     // Access the parameter `{documentId}` with `context.params`
//     functions.logger.log('Uppercasing', context.params.documentId, original);

//     const uppercase = original.toUpperCase();

//     // You must return a Promise when performing asynchronous tasks inside a Functions such as
//     // writing to Firestore.
//     // Setting an 'uppercase' field in Firestore document returns a Promise.
//     return snap.ref.set({uppercase}, {merge: true});
// });