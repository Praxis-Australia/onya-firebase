import { beforeUserCreated } from "firebase-functions/v2/identity";
import { createUser } from "./services/user";
import { Db, Logger } from "./dependencies";

export const getHandleUserCreate = (db: Db, logger: Logger) => beforeUserCreated(async (event) => {
  const { uid } = event.data;
  return createUser(db.userCollectionRef, uid)
    .then(() => {
      logger.log(`Created user ${uid}`)
    })
    .catch((err) => {
      logger.error(`Error creating user ${uid}`, err)
      throw err;
    });
})