import { Router } from "express";

import { postEntrada, postSaida, deleteRegistro, putEntrada, putSaida, getRegistros, getNomeUsuario } from "../controllers/userController.js";
import {validateTokenAndSession} from '../middlewares/validateTokenAndSessionMiddleware.js'
import {validateNovaEntrada, validateNovaSaida, validateNovaAlteracaoEntrada, validateNovaAlteracaoSaida} from '../middlewares/schemaJoiValidations.js'

const userRouter = Router();

userRouter.get('/buscar-registros', validateTokenAndSession, getRegistros)
userRouter.get('/buscar-nome', validateTokenAndSession, getNomeUsuario)
userRouter.post("/nova-entrada", validateTokenAndSession, validateNovaEntrada, postEntrada);
userRouter.post("/nova-saida", validateTokenAndSession, validateNovaSaida, postSaida);
userRouter.delete("/deletar-registro/:ID", validateTokenAndSession, deleteRegistro);
userRouter.put("/alterar-registro", validateTokenAndSession, validateNovaAlteracaoEntrada, putEntrada);
userRouter.put("/alterar-saida", validateTokenAndSession, validateNovaAlteracaoSaida, putSaida);

export default userRouter;
