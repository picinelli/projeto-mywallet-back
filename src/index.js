import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from './routers/authRouter.js'
import userRouter from './routers/userRouter.js'

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter)
app.use(userRouter)

app.listen(5000, console.log("O servidor foi ligado! :)"));
