import db from "../db.js";

export async function getRegistros(req, res) {
  const usuario = res.locals.usuario
  return res.send(usuario.registros).status(200)
}

export async function getNomeUsuario(req, res) {
  const usuario = res.locals.usuario
  return res.send(usuario.nome).status(200)
}

export async function postEntrada(req, res) {
  const body = { ...req.body, date: Date.now() };
  const usuario = res.locals.usuario
  if(body.value <= 0) {
    return res.status(400).send("Digite um valor valido (positivo)")
  }

  try {
    await db
      .collection("usuarios")
      .updateOne({ email: usuario.email }, { $push: { registros: body } });
    res.sendStatus(200);
  } catch (e) {
    console.log(e, "erro no catch do postEntrada");
    res.sendStatus(500);
  }
}

export async function postSaida(req, res) {
  const body = { ...req.body, date: Date.now() };
  const usuario = res.locals.usuario
  if(body.value >= 0) {
    return res.status(400).send("Digite um valor valido (negativo)")
  }

  try {
    await db
      .collection("usuarios")
      .updateOne({ email: usuario.email }, { $push: { registros: body } });
    res.sendStatus(200);
  } catch (e) {
    console.log(e, "erro no catch do postEntrada");
    res.sendStatus(500);
  }
}

export async function deleteRegistro(req, res) {
  const ID = parseInt(req.params.ID)
  const usuario = res.locals.usuario

  try {
    await db
      .collection("usuarios")
      .updateOne(
        { email: usuario.email },
        { $pull: { registros: {date: ID} } }
      );
    return res.sendStatus(200);

  } catch (e) {
    console.log(e, "erro no catch do deleteRegistro");
    res.sendStatus(500);
  }
}

export async function putEntrada(req, res) {
  const body = req.body;
  const usuario = res.locals.usuario

  try {
    await db
      .collection("usuarios")
      .findOneAndUpdate(
        { email: usuario.email, "registros.date" : body.date },
        { $set: { "registros.$.evento" : body.evento, "registros.$.value" : body.value } } 
      );
    res.sendStatus(200);
  } catch (e) {
    console.log(e, "erro no catch do putRegistro");
    res.sendStatus(500);
  }
}

export async function putSaida(req, res) {
  const body = req.body;
  const usuario = res.locals.usuario

  try {
    await db
      .collection("usuarios")
      .findOneAndUpdate(
        { email: usuario.email, "registros.date" : body.date },
        { $set: { "registros.$.evento" : body.evento, "registros.$.value" : body.value } } 
      );
    res.sendStatus(200);
  } catch (e) {
    console.log(e, "erro no catch do putRegistro");
    res.sendStatus(500);
  }
}
