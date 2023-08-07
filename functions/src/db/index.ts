import { CollectionReference, DocumentReference, Firestore } from "firebase-admin/firestore";

import { User } from "../models/User";
import { UserConverter } from "./utils/User";

import { BasiqAuthToken, BasiqTransaction } from "../models/Basiq";
import { BasiqTokenConverter, BasiqTransactionConverter } from "./utils/Basiq";

import { OnyaTransaction } from "../models/OnyaTransaction";
import { OnyaTransactionConverter } from "./utils/OnyaTransaction";

export class FirestoreDb {
  db: Firestore;

  userCollectionRef: CollectionReference<User>;
  basiqTokenDocRef: DocumentReference<BasiqAuthToken>;
  onyaTransactionCollectionRef: CollectionReference<OnyaTransaction>;

  userConverter = new UserConverter;
  basiqTokenConverter = new BasiqTokenConverter;
  onyaTransactionConverter = new OnyaTransactionConverter;
  basiqTransactionConverter = new BasiqTransactionConverter;

  constructor(db: Firestore) {
    this.db = db;

    this.userCollectionRef = db.collection('users')
      .withConverter(this.userConverter) as CollectionReference<User>;
    this.basiqTokenDocRef = db.collection('env').doc('basiqToken')
      .withConverter(this.basiqTokenConverter) as DocumentReference<BasiqAuthToken>;
    this.onyaTransactionCollectionRef = db.collection('onyaTransactions')
      .withConverter(this.onyaTransactionConverter) as CollectionReference<OnyaTransaction>;
  }

  getBasiqTransactionCollection(userDoc: DocumentReference<User>) {
    return userDoc.collection('basiqTransactions')
      .withConverter(this.basiqTransactionConverter) as CollectionReference<BasiqTransaction>;
  }
}