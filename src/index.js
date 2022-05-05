import "dotenv/config";
import express from "express";
import cors from "cors";
import { postCadastrar, postLogar } from "./controllers/authController.js";

const app = express();
app.use(cors());
app.use(express.json());


app.post("/cadastrar", postCadastrar);
//REMINDER - Provavelmente, futuramente será necessarios fazer o get das entradas/saidas ao logar
app.post("/logar", postLogar);

app.listen(5000, console.log("O servidor foi ligado! :)"));
