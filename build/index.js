"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./server/Server");
Server_1.server.listen(process.env.PORT, () => {
    console.log("PORT .. " + process.env.PORT || 3333);
    console.log("app rodando .index.ts 1320");
});
const a = 2;
