import { MongoClient } from "mongodb";
import "dotenv/config";

let db;
try {
  const mongoClient = new MongoClient(process.env.MONGO_URL);
  const promise = await mongoClient.connect().then(() => {
  db = mongoClient.db(process.env.DB_NAME);
  });
} catch (e) {
  console.log("Erro ao conectar ao MongoDB", e)
}

export default db