import { Router } from "express";

import { postRegistro, deleteRegistro, putRegistro, getRegistros } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get('/buscar-registros', getRegistros)
userRouter.post("/novo-registro", postRegistro);
userRouter.delete("/deletar-registro", deleteRegistro);
userRouter.put("/alterar-registro", putRegistro);

export default userRouter;
