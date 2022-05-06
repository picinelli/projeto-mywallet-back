import { Router } from "express";
import { postCadastrar, postLogar } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/cadastrar", postCadastrar);
//REMINDER - Será necessario fazer o get das entradas/saidas apos logar
authRouter.post("/logar", postLogar);

export default authRouter