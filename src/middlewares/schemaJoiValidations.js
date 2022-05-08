import joi from "joi";
import db from "../db.js";

export async function validateCadastro(req, res, next) {
  const body = req.body;
  const schema = joi.object({
    nome: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email().required(),
    senha: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirme: joi.ref("senha"),
  });
  const { value, error } = schema.validate(body);

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
  } catch (e) {
    console.log(e);
  }
  next();
}

export function validateLogin(req, res, next) {
  const body = req.body;

  const schema = joi.object({
    email: joi.string().email().required(),
    senha: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  const { value, error } = schema.validate(body);

  if (error) {
    const errorsDetails = error.details.map((object) => {
      return object.message;
    });
    return res.status(400).send(errorsDetails);
  }
  next();
}

export function validateNovaEntrada(req, res, next) {
  const body = req.body;
  body.value = parseInt(body.value);

  const schema = joi.object({
    evento: joi.string().required(),
    value: joi.number().required().positive(),
  });
  const { value, error } = schema.validate(body);

  if (error) {
    const errorsDetails = error.details.map((object) => {
      return object.message;
    });
    return res.status(400).send(errorsDetails);
  }
  next();
}

export function validateNovaAlteracaoEntrada(req, res, next) {
  const body = req.body;
  if(parseInt(body.value) <= 0) {
    body.value = parseInt(-body.value)
  } else {
    body.value = parseInt(body.value);
  }
  const schema = joi.object({
    evento: joi.string().required(),
    value: joi.number().required().positive(),
    date: joi.number(),
  });
  const { value, error } = schema.validate(body);

  if (error) {
    const errorsDetails = error.details.map((object) => {
      return object.message;
    });
    return res.status(400).send(errorsDetails);
  }
  next();
}

export function validateNovaAlteracaoSaida(req, res, next) {
  const body = req.body;

  if(parseInt(body.value) >= 0) {
    body.value = parseInt(-body.value);
  } else {
    body.value = parseInt(body.value);
  }
  const schema = joi.object({
    evento: joi.string().required(),
    value: joi.number().required(),
    date: joi.number(),
  });
  const { value, error } = schema.validate(body);

  if (error) {
    const errorsDetails = error.details.map((object) => {
      return object.message;
    });
    return res.status(400).send(errorsDetails);
  }
  next();
}

export function validateNovaSaida(req, res, next) {
  const body = req.body;
  body.value = parseInt(-body.value);

  const schema = joi.object({
    evento: joi.string().required(),
    value: joi.number().required().negative(),
  });
  const { value, error } = schema.validate(body);

  if (error) {
    const errorsDetails = error.details.map((object) => {
      return object.message;
    });
    return res.status(400).send(errorsDetails);
  }
  next();
}
