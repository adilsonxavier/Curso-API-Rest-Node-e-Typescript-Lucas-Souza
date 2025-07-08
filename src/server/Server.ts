import express from "express";
import {router} from "./routes";
import "dotenv/config"; // A biblioteca dotenv serve para ler as variáveis do arquivo .env
                        // sem ela, teria que criar uma função com o fs para ler o arquivo e extrair as variáveis

import "./shared/services/TraducoesYup"

const server = express();

server.use(express.json() );// sem isso não consigo usar os dados de body

server.use(router)



interface Teste{

}

export {server};