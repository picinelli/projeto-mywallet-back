import db from '../db.js'
import {ObjectId} from 'mongodb'

export async function postRegistro(req, res) {
  const {authorization} = req.headers
  if(!authorization) return res.status(401).send("erro 1");
  const token = authorization.replace("Bearer", "").trim()

  try {
    const session = await db.collection("sessoes").findOne({token})
    if(!session) return res.status(401).send("erro 2");
    const usuario = await db.collection("usuarios").findOne({_id: new ObjectId(session.userId)})
    if(!usuario) return res.status(401).send("erro 3");

    await db.collection("usuarios").updateOne({email: usuario.email}, {$push: {registros: req.body}})
    res.sendStatus(200);
    console.log(usuario)
  } catch(e) {
    console.log(e, "erro no catch do postRegistro")
    res.sendStatus(500)
  }
}