import "dotenv/config";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import joi from "joi";

const app = express();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
const promise = mongoClient.connect().then(() => {
  db = mongoClient.db(process.env.DB_NAME);
});

app.post("/cadastrar", (req, res) => {
  const body = req.body;
  const { nome, email, senha, confirme } = body;
  const schema = joi.object({
    nome: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email().required(),
    senha: joi.any().required(),
    confirme: joi.ref("senha"),
  });
  const { value, error } = schema.validate(body, { abortEarly: false });

  if (error) {
    const errorsDetails = error.details.map(object => {return object.message})
    res.status(400).send(errorsDetails);
    return;
  } else {
    res.sendStatus(201);
  }
});

app.listen(5000, console.log("O servidor foi ligado! :)"));
