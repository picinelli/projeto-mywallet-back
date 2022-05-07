import db from "../db.js";

export async function getRegistros(req, res) {
  console.log(req.headers)
  const usuario = res.locals.usuario
  return res.send(usuario.registros).status(200)
}

export async function postEntrada(req, res) {
  const body = { ...req.body, date: Date.now() };
  const usuario = res.locals.usuario
  if(body.valor <= 0) {
    return res.status(400).send("Digite um valor valido (positivo)")
  }

  try {
    await db
      .collection("usuarios")
      .updateOne({ email: usuario.email }, { $push: { registros: body } });
    res.sendStatus(200);
    console.log(usuario);
  } catch (e) {
    console.log(e, "erro no catch do postEntrada");
    res.sendStatus(500);
  }
}

export async function postSaida(req, res) {
  const body = { ...req.body, date: Date.now() };
  const usuario = res.locals.usuario
  if(body.valor >= 0) {
    return res.status(400).send("Digite um valor valido (negativo)")
  }

  try {
    await db
      .collection("usuarios")
      .updateOne({ email: usuario.email }, { $push: { registros: body } });
    res.sendStatus(200);
    console.log(usuario);
  } catch (e) {
    console.log(e, "erro no catch do postEntrada");
    res.sendStatus(500);
  }
}

export async function deleteRegistro(req, res) {
  const body = req.body;
  const usuario = res.locals.usuario

  try {
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
  const usuario = res.locals.usuario

  try {
    await db
      .collection("usuarios")
      .findOneAndUpdate(
        { email: usuario.email, "registros.date" : body.date },
        { $set: { "registros.$.evento" : body.evento, "registros.$.valor" : body.valor } } 
      );
    res.sendStatus(200);
  } catch (e) {
    console.log(e, "erro no catch do putRegistro");
    res.sendStatus(500);
  }
}
