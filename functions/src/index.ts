import { setGlobalOptions } from 'firebase-functions/v2/options';
import { initializeApp } from 'firebase-admin/app';

const app = initializeApp()
setGlobalOptions({ region: 'australia-southeast1' });

import { FirestoreDb } from './db';
import { getFirestore } from 'firebase-admin/firestore';
const firestore = new FirestoreDb(getFirestore());

import { logger } from 'firebase-functions';

import { defineSecret } from 'firebase-functions/params';
const basiqApiKey = defineSecret("BASIQ_API_KEY");

import { getHandleUserCreate } from './handleUserCreate';
export const handleUserCreate = getHandleUserCreate(firestore, logger);

import { getCreateBasiqUser } from './createBasiqUser';
export const createBasiqUser = getCreateBasiqUser(firestore, logger, basiqApiKey);

import { getRefreshUserBasiqInfo } from './refreshUserBasiqInfo';
export const refreshUserBasiqInfo = getRefreshUserBasiqInfo(firestore, logger, basiqApiKey);

import { getFetchClientToken } from './fetchClientToken';
export const fetchClientToken = getFetchClientToken(firestore, logger, basiqApiKey);

import { getRefreshAllUsersBasiqInfo } from './refreshAllBasiqUserInfo';
export const refreshAllUsersBasiqInfo = getRefreshAllUsersBasiqInfo(firestore, logger, basiqApiKey);