import { logger } from "firebase-functions";
import { FirestoreDb } from "./db";
import Basiq from './api/basiq';

export type Db = FirestoreDb;
export type Logger = typeof logger;

export { Basiq };