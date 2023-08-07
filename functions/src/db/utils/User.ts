import { FirestoreDataConverter, Timestamp } from "firebase-admin/firestore";
import { User } from "../../models/User";
import { FirestoreBasiqData } from "./Basiq";

export interface FirestoreUser {
  uid: User['uid'],
  firstName: User['firstName'],
  lastName: User['lastName'],
  email: User['email'],
  charitySelection: User['charitySelection'],
  donationMethods: User['donationMethods'],
  
  userCreated: Timestamp,
  basiq: FirestoreBasiqData,
}

// const matchesCharitySelection = (obj: any): obj is User['charitySelection'] => {
//   return (
//     obj instanceof Map &&
//     Array.from(obj.keys()).every(key => typeof key === 'string') &&
//     Array.from(obj.values()).every(value => typeof value === 'number')
//   );
// }

// const matchesDonationMethods = (obj: any): obj is User['donationMethods'] => {
//   return (
//     typeof obj.roundup === 'object' &&

// }

// const matchesFirestoreBasiqData = (obj: any): obj is FirestoreBasiqData => {

// }

export class UserConverter implements FirestoreDataConverter<User> {
  // matchesFirestoreUser = (obj: any): obj is FirestoreUser => {
  //   return (
  //     typeof obj.uid === 'string' &&
  //     typeof obj.firstName === 'string' &&
  //     typeof obj.lastName === 'string' &&
  //     (typeof obj.email === 'string' || obj.email === null) &&
  //     matchesCharitySelection(obj.charitySelection) &&
  //     matchesDonationMethods(obj.donationMethods) &&
  //     obj.userCreated instanceof Timestamp &&
  //     matchesFirestoreBasiqData(obj.basiq)
  //   );
  // }
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>): User {
    const data = snapshot.data() as FirestoreUser;

    // if (!this.matchesFirestoreUser(data)) {
    //   throw new TypeError
    // }

    let basiqData: User['basiq'] = (data.basiq.configStatus === 'COMPLETE') ? {
      configStatus: data.basiq.configStatus,
      uid: data.basiq.uid,
      clientToken: data.basiq.clientToken,
      availableAccounts: data.basiq.availableAccounts.map(account => ({
        accountNumber: account.accountNumber,
        id: account.id,
        institution: account.institution,
        name: account.name,
        lastUpdated: account.lastUpdated.toDate()
      }))
    } : data.basiq;

    return {
      uid: data.uid,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      charitySelection: data.charitySelection,
      donationMethods: data.donationMethods,

      userCreated: data.userCreated.toDate(),
      basiq: basiqData
    }
  }

  toFirestore(user: User): FirestoreUser {
    let firebaseBasiqData: FirestoreBasiqData = (user.basiq.configStatus === 'COMPLETE') ? {
      configStatus: user.basiq.configStatus,
      uid: user.basiq.uid,
      clientToken: user.basiq.clientToken,
      availableAccounts: user.basiq.availableAccounts.map(account => ({
        accountNumber: account.accountNumber,
        id: account.id,
        institution: account.institution,
        name: account.name,
        lastUpdated: Timestamp.fromDate(account.lastUpdated)
      }))
    } : user.basiq;

    return {
      uid: user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      charitySelection: user.charitySelection,
      donationMethods: user.donationMethods,
      userCreated: Timestamp.fromDate(user.userCreated),
      basiq: firebaseBasiqData
    }
  }
}