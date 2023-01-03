const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fs = require('fs');
const basiqApi = require('./basiqApi');

let templateUserDoc = JSON.parse(fs.readFileSync('template_user_doc.json'));

admin.initializeApp();

const createUser = async (uid) => {
    try {
        const writeResult = await admin.firestore().collection('users').doc(uid).set({
            ...templateUserDoc,
            uid: uid,
            userCreated: admin.firestore.Timestamp.now()
        })

        functions.logger.log(`Success creating user ${uid}`);
        return writeResult;
    } catch (err) {
        functions.logger.error(`Error creating user ${uid}`, err)
    }
}

exports.createUser = functions.auth.user().beforeCreate(async (user, context) => {
    const { uid } = user;
    return await createUser(uid);
})

exports.createBasiqUser = functions.https.onCall(async (data, context) => {
    const { uid } = context.auth;
    const phoneNumber = context.auth.token.phone_number;
    const { firstName, lastName } = data;
    const result = await basiqApi.createBasiqUser(uid, phoneNumber, firstName, lastName);
    return result;
})

exports.refreshUserBasicInfo = functions.https.onCall(async (data, context) => {
    const { uid } = context.auth;
    const result = await basiqApi.refreshUserBasicInfo(uid);
    return result;
})