import joi from "joi";
import db from "../db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const token = uuid();

export async function postCadastrar(req, res) {
  const body = req.body;
  const schema = joi.object({
    nome: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email().required(),
    senha: joi.any().required(),
    confirme: joi.ref("senha"),
  });
  const { value, error } = schema.validate(body, { abortEarly: false });

  if (error) {
    const errorsDetails = error.details.map((object) => {
      return object.message;
    });
    return res.status(400).send(errorsDetails);
  }

  try {
    const usuarios = await db.collection("usuarios").find({}).toArray();
    const usuarioExistente = usuarios.find((user) => user.email === body.email);
    if (usuarioExistente) {
      return res.status(409).send("Usuário já existente");
    }
    const senhaCriptografada = bcrypt.hashSync(body.senha, 10);
    await db.collection("usuarios").insertOne({
      nome: body.nome,
      email: body.email,
      senha: senhaCriptografada,
      confirme: body.confirme,
    });
    res.sendStatus(201);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function postLogar(req, res) {
  const body = req.body;

  const schema = joi.object({
    email: joi.string().email().required(),
    senha: joi.any().required(),
  });
  const { value, error } = schema.validate(body, { abortEarly: false });

  if (error) {
    const errorsDetails = error.details.map((object) => {
      return object.message;
    });
    return res.status(400).send(errorsDetails);
  } else {
    try {
      const usuario = await db
        .collection("usuarios")
        .findOne({ email: body.email });
      const senhaDescriptografada = bcrypt.compareSync(
        body.senha,
        usuario.senha
      );
      if (!usuario || !senhaDescriptografada) {
        return res.sendStatus(404);
      }
      await db.collection("sessoes").insertOne({ userId: usuario._id, token });
      res.status(200).send(token);
    } catch {
      res.sendStatus(500);
    }
  }
}
