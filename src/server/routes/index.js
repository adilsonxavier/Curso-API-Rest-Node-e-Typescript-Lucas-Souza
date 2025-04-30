"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/teste", (req, res) => {
    res.send("ola dev '.server/routes/index.ts' router.get /teste 1322" + JSON.stringify(req.body));
    console.log("app rodando aaaa router.get /teste 1327");
});
// router.post("/teste", (req,res)=>{
//   // res.send("ola dev '.server/routes/index.ts' router.get /teste 1115" + JSON.stringify( req.body))
//   res.status(StatusCodes.FORBIDDEN).json(req.body)  // O método res.json(req.body) manda de volta o conteúdo pro front end (assim como o res.send(conteudo))
//                       // mas o res.json instrui o front end que se trata de um json e com isso ele vai conseguir tratar
//                       // melhor os dados , podendo acessar o Header e outras configurações
//   console.log("req.body " + JSON.stringify( req.body));
//   //console.log("app rodando aaaa router.get /teste 1115");
// })
router.post("/", (req, res) => {
    res.send("ola dev '.server/routes/index.ts' router.get / 1115");
});
router.post("/testequery", (req, res) => {
    console.log("testando com query ?nome=adilson na url " + req.query.nome);
    res.send(req.query.nome);
});
