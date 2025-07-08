"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
require("dotenv/config"); // A biblioteca dotenv serve para ler as variáveis do arquivo .env
// sem ela, teria que criar uma função com o fs para ler o arquivo e extrair as variáveis
require("./shared/services/TraducoesYup");
const server = (0, express_1.default)();
exports.server = server;
server.use(express_1.default.json()); // sem isso não consigo usar os dados de body
server.use(routes_1.router);
