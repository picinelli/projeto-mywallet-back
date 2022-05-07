import { Router } from "express";

import { postEntrada, postSaida, deleteRegistro, putRegistro, getRegistros } from "../controllers/userController.js";
import {validateTokenAndSession} from '../middlewares/validateTokenAndSessionMiddleware.js'

const userRouter = Router();

userRouter.get('/buscar-registros', validateTokenAndSession, getRegistros)
userRouter.post("/nova-entrada", validateTokenAndSession, postEntrada);
userRouter.post("/nova-saida", validateTokenAndSession, postSaida);
userRouter.delete("/deletar-registro", validateTokenAndSession, deleteRegistro);
userRouter.put("/alterar-registro", validateTokenAndSession, putRegistro);

export default userRouter;
