import * as mongoDB from "mongodb";
import { config } from 'dotenv'

config()
const dbPassword = process.env.DB_PASSWORD

const cliente = new mongoDB.MongoClient(
  `mongodb+srv://vagnerio:${dbPassword}@lobby-cluster.fcmtbru.mongodb.net/?retryWrites=true&w=majority`
);

cliente.connect();

const db: mongoDB.Db = cliente.db("lobby-simulator");

console.log("MongoDB Conected!");


export {
  db,
};