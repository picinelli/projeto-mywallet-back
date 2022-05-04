import "dotenv/config";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import joi from "joi";

const app = express();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URL);
let db;
const promise = mongoClient.connect().then(() => {
  db = mongoClient.db(process.env.DB_NAME);
});

//FIX ME - Fazer a verificação se já existe email registrado
app.post("/cadastrar", async (req, res) => {
  const body = req.body;
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
    try {
      await db.collection("usuarios").insertOne({
        nome: body.nome,
        email: body.email,
        senha: body.senha,
        confirme: body.confirme
      })
      res.sendStatus(201);
    } catch {
      res.sendStatus(500)
    }
  }
});

//REMINDER - Provavelmente, futuramente será necessarios fazer o get das entradas/saidas ao logar 
app.post("/logar", async (req, res) => {
  const body = req.body
  
  const schema = joi.object({
    email: joi.string().email().required(),
    senha: joi.any().required(),
  });
  const { value, error } = schema.validate(body, { abortEarly: false });

  if (error) {
    const errorsDetails = error.details.map(object => {return object.message})
    res.status(400).send(errorsDetails);
    return;
  } else {
    try {
      const usuario = await db.collection("usuarios").findOne({
        email: body.email,
        senha: body.senha,
      })
      if(!usuario) {
        res.sendStatus(404)
        return
      }
      res.sendStatus(200);
    } catch {
      res.sendStatus(500)
    }
  }
})

app.listen(5000, console.log("O servidor foi ligado! :)"));
