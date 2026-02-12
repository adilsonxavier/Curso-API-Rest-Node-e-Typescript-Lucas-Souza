import {server} from "./server/Server";

server.listen(process.env.PORT, ()=> {
    console.log("PORT .. "+process.env.PORT || 3333);
    console.log("app rodando .index.ts 1320");
    console.log("var .. "+process.env.VAR || "sem var");
    const a = undefined;

});

const a = 2;