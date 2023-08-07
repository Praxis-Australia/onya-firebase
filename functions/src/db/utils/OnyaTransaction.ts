import { FirestoreDataConverter, Timestamp } from "firebase-admin/firestore";
import { OnyaTransaction } from "../../models/OnyaTransaction";

interface FirestoreOnyaTransaction {
    basiqJobId: OnyaTransaction['basiqJobId'],
    status: OnyaTransaction['status'],
    payer: OnyaTransaction['payer'],
    description: OnyaTransaction['description'],
    amount: OnyaTransaction['amount'],
    donationSources: OnyaTransaction['donationSources'],

    created: Timestamp,
    updated: Timestamp
  }

export class OnyaTransactionConverter implements FirestoreDataConverter<OnyaTransaction> {
    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>): OnyaTransaction {
        const data = snapshot.data() as FirestoreOnyaTransaction;

        return {
            basiqJobId: data.basiqJobId,
            status: data.status,
            payer: data.payer,
            description: data.description,
            amount: data.amount,
            donationSources: data.donationSources,

            created: data.created.toDate(),
            updated: data.updated.toDate()
        }
    }

    toFirestore(onyaTransaction: OnyaTransaction): FirestoreOnyaTransaction {
        return {
            basiqJobId: onyaTransaction.basiqJobId,
            status: onyaTransaction.status,
            payer: onyaTransaction.payer,
            description: onyaTransaction.description,
            amount: onyaTransaction.amount,
            donationSources: onyaTransaction.donationSources,
            created: Timestamp.fromDate(onyaTransaction.created),
            updated: Timestamp.fromDate(onyaTransaction.updated)
        }
    }
}