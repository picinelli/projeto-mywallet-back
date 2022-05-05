import db from "../db.js";
import { ObjectId } from "mongodb";

export async function postRegistro(req, res) {
  const body = { ...req.body, date: Date.now() };
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send("Token nao encontrado");
  const token = authorization.replace("Bearer", "").trim();

  try {
    const session = await db.collection("sessoes").findOne({ token });
    if (!session) return res.status(401).send("Sessao nao encontrada");
    const usuario = await db
      .collection("usuarios")
      .findOne({ _id: new ObjectId(session.userId) });
    if (!usuario) return res.status(401).send("Usuario nao encontrado");

    await db
      .collection("usuarios")
      .updateOne({ email: usuario.email }, { $push: { registros: body } });
    res.sendStatus(200);
    console.log(usuario);
  } catch (e) {
    console.log(e, "erro no catch do postRegistro");
    res.sendStatus(500);
  }
}

export async function deleteRegistro(req, res) {
  const body = req.body;
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send("Token nao encontrado");
  const token = authorization.replace("Bearer", "").trim();

  try {
    const session = await db.collection("sessoes").findOne({ token });
    if (!session) return res.status(401).send("Sessao nao encontrada");
    const usuario = await db
      .collection("usuarios")
      .findOne({ _id: new ObjectId(session.userId) });
    if (!usuario) return res.status(401).send("Usuario nao encontrado");

    await db
      .collection("usuarios")
      .updateOne(
        { email: usuario.email },
        { $pull: { registros: { date: body.date } } }
      );
    res.sendStatus(200);
    console.log(usuario);
  } catch (e) {
    console.log(e, "erro no catch do postRegistro");
    res.sendStatus(500);
  }
}

export async function putRegistro(req, res) {
  const body = req.body;
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send("Token nao encontrado");
  const token = authorization.replace("Bearer", "").trim();

  try {
    const session = await db.collection("sessoes").findOne({ token });
    if (!session) return res.status(401).send("Sessao nao encontrada");
    const usuario = await db
      .collection("usuarios")
      .findOne({ _id: new ObjectId(session.userId) });
    if (!usuario) return res.status(401).send("Usuario nao encontrado");

    await db
      .collection("usuarios")
      .findOneAndUpdate(
        { email: usuario.email, "registros.date" : body.date },
        { $set: { "registros.$.evento" : body.evento, "registros.$.valor" : body.valor } } 
      );
    res.sendStatus(200);
    const teste = await db.collection("usuarios").findOne({ _id: new ObjectId(session.userId) });
    console.log(teste)
  } catch (e) {
    console.log(e, "erro no catch do putRegistro");
    res.sendStatus(500);
  }
}
