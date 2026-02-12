import {Router} from "express";
import {StatusCodes} from "http-status-codes"

import {CidadesControler} from "./../controllers";
import { createBodyValidator } from "../controllers/cidades/Create";

const router =  Router();

router.get("/teste", (req,res)=>{
     res.send("ola dev '.server/routes/index.ts' router.get /teste 1322" + JSON.stringify( req.body))
   
    console.log("app rodando aaaa router.get /teste 1327");
  })
  

router.post("/teste", (req,res)=>{
  // res.send("ola dev '.server/routes/index.ts' router.get /teste 1115" + JSON.stringify( req.body))
  res.status(StatusCodes.OK).json(req.body)  // O método res.json(req.body) manda de volta o conteúdo pro front end (assim como o res.send(conteudo))
                      // mas o res.json instrui o front end que se trata de um json e com isso ele vai conseguir tratar
                      // melhor os dados , podendo acessar o Header e outras configurações
  console.log("req.body " + JSON.stringify( req.body));
  //console.log("app rodando aaaa router.get /teste 1115");
})

router.post("/", (req,res)=>{
  res.send("ola dev '.server/routes/index.ts' router.get / 11633")
 
})

router.post("/cidade", 
    CidadesControler.createBodyValidator, 
    CidadesControler.createValidation, 
    CidadesControler.create)

router.post("/aaa", (req,res)=>{
    res.send("ola dev '.server/routes/index.ts' router.get / 1632")
   
  })

router.post("/testequery", (req,res)=>{
    console.log("testando com query ?nome=adilson na url " + req.query.nome)
    res.send(req.query.nome)
   
  })

//   router.post("/testeheader", (req,res)=>{
//     console.log("testando com header minhaHeader " + req.headers.minhaHeader)
//     res.send(req.headers.minhaHeader)
   
//   })  
  

export {router};