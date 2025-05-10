import express , {Request, Response} from 'express';
import dbConnect from './db/dbConnect';
import {config} from 'dotenv'
import router from "./routers";
import cors from 'cors'; 

config()
const PORT = Number(process.env.PORT) || 5000;
const HOST =  process.env.HOST || 'localhost';
const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["PUT", "GET", "POST", "DELETE"],
}));
app.use(express.json())
app.use("/api", router)

dbConnect()

app.listen(PORT, HOST , () => {
    console.log( `Servidor corriendo en http://${HOST}:${PORT}`)
})

