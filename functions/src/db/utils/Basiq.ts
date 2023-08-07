import { FirestoreDataConverter, Timestamp } from "firebase-admin/firestore";
import {
    BasiqDataNotConfigured,
    BasiqDataUserCreated,
    BasiqDataComplete,
    BasiqAuthToken,
    BasiqAccount,
    BasiqTransaction
} from "../../models/Basiq";

export type FirestoreBasiqData =
    | FirestoreBasiqDataNotConfigured
    | FirestoreBasiqDataUserCreated
    | FirestoreBasiqDataComplete;

interface FirestoreBasiqDataNotConfigured {
    configStatus: BasiqDataNotConfigured['configStatus']
}

interface FirestoreBasiqDataUserCreated {
    configStatus: BasiqDataUserCreated['configStatus'],
    uid: BasiqDataUserCreated['uid'],

    clientToken: FirestoreBasiqAuthToken
}

interface FirestoreBasiqDataComplete {
    configStatus: BasiqDataComplete['configStatus'],
    uid: BasiqDataComplete['uid'],

    clientToken: BasiqAuthToken,
    availableAccounts: Array<FirestoreBasiqAccount>,
}

interface FirestoreBasiqAccount {
    accountNumber: BasiqAccount['accountNumber'],
    id: BasiqAccount['id'],
    institution: BasiqAccount['institution'],
    name: BasiqAccount['name'],

    lastUpdated: Timestamp
}

export interface FirestoreBasiqAuthToken {
    access_token: BasiqAuthToken['access_token'],
    expires_at: BasiqAuthToken['expires_at']
}

interface FirestoreBasiqTransaction {
    id: BasiqTransaction['id'],
    accountId: BasiqTransaction['accountId'],
    amount: BasiqTransaction['amount'],
    class: BasiqTransaction['class'],
    connection: BasiqTransaction['connection'],
    description: BasiqTransaction['description'],
    direction: BasiqTransaction['direction'],
    institutionId: BasiqTransaction['institutionId'],
    status: BasiqTransaction['status'],
    enrich: BasiqTransaction['enrich'],

    postDate: Timestamp | null,
    transactionDate: Timestamp | null,
}

export class BasiqTokenConverter implements FirestoreDataConverter<BasiqAuthToken> {
    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>): BasiqAuthToken {
        const data = snapshot.data() as FirestoreBasiqAuthToken;

        return {
            access_token: data.access_token,
            expires_at: data.expires_at
        }
    }

    toFirestore(basiqAuthToken: BasiqAuthToken): FirestoreBasiqAuthToken {
        return {
            access_token: basiqAuthToken.access_token,
            expires_at: basiqAuthToken.expires_at
        }
    }
}

export class BasiqTransactionConverter implements FirestoreDataConverter<BasiqTransaction> {
    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>): BasiqTransaction {
        const data = snapshot.data() as FirestoreBasiqTransaction;

        return {
            id: data.id,
            accountId: data.accountId,
            amount: data.amount,
            class: data.class,
            connection: data.connection,
            description: data.description,
            direction: data.direction,
            institutionId: data.institutionId,
            status: data.status,
            enrich: data.enrich,

            postDate: data.postDate?.toDate() ?? null,
            transactionDate: data.transactionDate?.toDate() ?? null,
        };
    }

    toFirestore(basiqTransaction: BasiqTransaction): FirestoreBasiqTransaction {
        return {
            id: basiqTransaction.id,
            accountId: basiqTransaction.accountId,
            amount: basiqTransaction.amount,
            class: basiqTransaction.class,
            connection: basiqTransaction.connection,
            description: basiqTransaction.description,
            direction: basiqTransaction.direction,
            institutionId: basiqTransaction.institutionId,
            status: basiqTransaction.status,
            enrich: basiqTransaction.enrich,

            postDate: basiqTransaction.postDate ? Timestamp.fromDate(basiqTransaction.postDate) : null,
            transactionDate: basiqTransaction.transactionDate ? Timestamp.fromDate(basiqTransaction.transactionDate) : null,
        };
    }
}