import db from "../db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";



export async function postCadastrar(req, res) {
  const body = req.body;

  try {
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
  const token = uuid();
  try {
    const usuario = await db
      .collection("usuarios")
      .findOne({ email: body.email });
    const senhaDescriptografada = bcrypt.compareSync(body.senha, usuario.senha);
    if (!usuario || !senhaDescriptografada) {
      return res.sendStatus(404);
    }
    await db.collection("sessoes").insertOne({ userId: usuario._id, token });
    res.status(200).send(token);
  } catch {
    res.sendStatus(500);
  }
}
