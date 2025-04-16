import express from "express";

const server = express();

server.get("/", (req,res)=>{
    res.send("ola dev 1604")
    console.log("app rodando aaaa server");
})




export {server};