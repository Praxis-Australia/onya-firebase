# Onya Firebase Backend

Implements backend functionality for Onya Beta on the Firebase Cloud Functions platform.

Requires Node v18.  

To setup:
1. Run `yarn` or `npm install` to install dependencies
2. Set up the Firebase CLI
    - Install via `npm install -g firebase-tools` or `yarn` equivalent)
    - Authenticate via `firebase login`

To test: Run `npm run serve` to compile `.ts` files into `.js` and start a Emulator server
- Note that the emulator only simulates the cloud functions, and not other Firebase services. This means that all the changes in Firestore, etc. happen on production. (Will fix this soon).
  - The `createUser` function also cannot be emulated as it runs with a Firebase Authentication trigger. To test this, it needs to be actually deployed.

To deploy: Run `npm run deploy` to compile `.ts` files and deploy to Firebase.