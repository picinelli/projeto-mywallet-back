import { Router } from "express";
import { postCadastrar, postLogar } from "../controllers/authController.js";
import { validateCadastro, validateLogin } from "../middlewares/schemaJoiValidations.js";

const authRouter = Router();

authRouter.post("/cadastrar", validateCadastro, postCadastrar);
authRouter.post("/logar", validateLogin, postLogar);

export default authRouter;
