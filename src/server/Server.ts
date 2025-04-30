import express from "express";
import {router} from "./routes";
import "dotenv/config";

const server = express();

server.use(express.json() );// sem isso não consigo usar os dados de body

server.use(router)



interface Teste{

}

export {server};