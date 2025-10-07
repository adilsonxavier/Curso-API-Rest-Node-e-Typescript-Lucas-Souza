import { json, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";


//export const teste = {}

interface ICidade {
    nome: string;
    estado: string;
}

interface IFilter{
    filter: string;
}

const queryValidation: yup.SchemaOf<IFilter> =yup.object().shape({
    filter : yup.string().required()
})

const bodyValidation: yup.SchemaOf<ICidade> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(2),
});


export const createBodyValidator : RequestHandler= async (req, res,next) => {
    try {
        console.log("cidade createBodyValidator;");

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
    }
}

// export const createQueryValidator : RequestHandler= async (req, res,next) => {
//     try {
//         console.log("cidade createQueryValidator ");
//         //validateData = await bodyValidation.validate(req.body);
//         await queryValidation.validate(req.query,{abortEarly:false});
//         next();
//     } catch (error) {
//         const yupError = error as yup.ValidationError; // Estudar melhor o "as"
        
//         const validationErrors: Record<string,string> = {};

//         yupError.inner.forEach(erro=>{
//             if(!erro.path)
//                 return;
//            validationErrors[erro.path] = erro.message;
          

//         })
//         console.log(" validationErrors:::"+ JSON.stringify( validationErrors));

//         res.status(StatusCodes.BAD_REQUEST).json({
//             errors:  validationErrors,
            
//         });

//     }
// }


//export const createValidation = validation("query",queryValidation);
export const createValidation = validation({
    query:
    bodyValidation
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
   console.log("usando middleware");
    console.log("validateData"+JSON.stringify(req.body));
    res.send(req.body);
};
