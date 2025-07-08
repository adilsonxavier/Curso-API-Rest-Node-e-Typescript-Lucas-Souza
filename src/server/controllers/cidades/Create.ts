import { json, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";


//export const teste = {}

interface ICidade {
    nome: string;
    estado: string;
}

interface IFilter{
    filter: string;
}

const queryValidation: yup.Schema<IFilter> =yup.object().shape({
    filter : yup.string().required()
})

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(2),
});
// Como o yup está usando a interface ICidade, é necessário usar .required() ou mudar na interface:
// nome: string; para nome?: string;


export const createBodyValidator : RequestHandler= async (req, res,next) => {
    try {
        console.log("cidade create;");
        //validateData = await bodyValidation.validate(req.body);
        await bodyValidation.validate(req.body,{abortEarly:false});
        next();
    } catch (error) {
        const yupError = error as yup.ValidationError; // Estudar melhor o "as"
        
        const validationErrors: Record<string,string> = {};

        yupError.inner.forEach(erro=>{
            if(!erro.path)
                return;
           validationErrors[erro.path] = erro.message;
          

        })
        console.log(" validationErrors:::"+ JSON.stringify( validationErrors));

        res.status(StatusCodes.BAD_REQUEST).json({
            errors:  validationErrors,
            
        });
        // ================
        // também funcionou sem o json() no final:
        // res.send({
        //     errors: {
        //         default: yupError.message,
        //     },
        // }).status(StatusCodes.BAD_REQUEST);

    }
}
// Passando o mouse sobre o Request abaixo:
// (alias) interface Request<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = QueryString.ParsedQs,
// Locals extends Record<string, any> = Record<string, any>>
// Veja que o terceiro parâmetro é ReqBody = any então eu vou passar na 3º posição o tipo ICidade substituindo
// o tipo dele (que era any) pra melhorar a  tipagem (req: Request<{},{},ICidade>...
export const createQueryValidator : RequestHandler= async (req, res,next) => {
    try {
        console.log("cidade create;");
        //validateData = await bodyValidation.validate(req.body);
        await queryValidation.validate(req.query,{abortEarly:false});
        next();
    } catch (error) {
        const yupError = error as yup.ValidationError; // Estudar melhor o "as"
        
        const validationErrors: Record<string,string> = {};

        yupError.inner.forEach(erro=>{
            if(!erro.path)
                return;
           validationErrors[erro.path] = erro.message;
          

        })
        console.log(" validationErrors:::"+ JSON.stringify( validationErrors));

        res.status(StatusCodes.BAD_REQUEST).json({
            errors:  validationErrors,
            
        });
        // ================
        // também funcionou sem o json() no final:
        // res.send({
        //     errors: {
        //         default: yupError.message,
        //     },
        // }).status(StatusCodes.BAD_REQUEST);

    }
}

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
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
    // As linhas acima foram um modelo antes de usar o yup
    //======= Usando o yup ============
   // let validateData: ICidade | undefined = undefined;

   console.log("usando middleware");
    console.log("validateData"+JSON.stringify(req.body));
    res.send(req.body);
    res.send(req.query)
};
