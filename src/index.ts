import express, { Request, Response } from "express";
import dotenv from 'dotenv'
import cors from "cors";

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
 

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})
