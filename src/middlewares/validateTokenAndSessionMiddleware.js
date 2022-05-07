import db from '../db.js'
import { ObjectId } from "mongodb";

export async function validateTokenAndSession(req, res, next) {
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
    res.locals.usuario = usuario;
  } catch (e) {
    console.log(e)
  }
  next()
}