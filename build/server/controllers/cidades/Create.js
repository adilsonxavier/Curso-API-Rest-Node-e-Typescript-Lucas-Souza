"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const http_status_codes_1 = require("http-status-codes");
const yup = __importStar(require("yup"));
const bodyValidation = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(2),
});
// Como o yup está usando a interface ICidade, é necessário usar .required() ou mudar na interface:
// nome: string; para nome?: string;
// Passando o mouse sobre o Request abaixo:
// (alias) interface Request<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = QueryString.ParsedQs,
// Locals extends Record<string, any> = Record<string, any>>
// Veja que o terceiro parâmetro é ReqBody = any então eu vou passar na 3º posição o tipo ICidade substituindo
// o tipo dele (que era any) pra melhorar a  tipagem (req: Request<{},{},ICidade>...
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //return res.send("Create cidade");
    // com o return da erro em src\server\routes\index.ts na linha:
    // router.post("/cidade",CidadesControler.create)
    //    const data: ICidade = req.body;
    //    console.log(data.nome);
    //    res.send("Create cidade");
    // if (req.body.nome === undefined) {
    //       res.status(StatusCodes.BAD_REQUEST).send("informe o nomsse");
    // }
    // res.send("Create cidade "+ req.body.nome);
    // console.log(req.body.nome);
    //======= Usando o yup ============
    let validateData = undefined;
    try {
        console.log("cidade create;");
        //validateData = await bodyValidation.validate(req.body);
        validateData = yield bodyValidation.validate(req.body, { abortEarly: false });
    }
    catch (error) {
        const yupError = error; // Estudar melhor o "as"
        const validationErrors = {};
        yupError.inner.forEach(erro => {
            if (!erro.path)
                return;
            validationErrors[erro.path] = erro.message;
        });
        console.log(" validationErrors:::" + JSON.stringify(validationErrors));
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            errors: validationErrors,
        });
        // ================
        // também funcionou sem o json() no final:
        // res.send({
        //     errors: {
        //         default: yupError.message,
        //     },
        // }).status(StatusCodes.BAD_REQUEST);
    }
    console.log("validateData" + JSON.stringify(validateData));
    res.send(validateData);
});
exports.create = create;
