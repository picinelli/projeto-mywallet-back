import "dotenv/config";
import express from "express";
import cors from "cors";
import { postCadastrar, postLogar } from "./controllers/authController.js";
import { postRegistro, deleteRegistro, putRegistro } from "./controllers/userController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/cadastrar", postCadastrar);
//REMINDER - Será necessario fazer o get das entradas/saidas apos logar
app.post("/logar", postLogar);

app.post("/novo-registro", postRegistro);
app.delete("/deletar-registro", deleteRegistro)
app.put("/alterar-registro", putRegistro)

app.listen(5000, console.log("O servidor foi ligado! :)"));
