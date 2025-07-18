import { RequestHandler } from "express";
import { SchemaOf,ValidationError } from "yup";
import { StatusCodes } from "http-status-codes";

type TValidation = (field: "header" | "body"| "params"|"query" ,scheme: SchemaOf<any>) => RequestHandler;

// A função validation não retorna um objeto e sim uma função (do tipo RequestHandler) , por isso eu não posso usar
// como abaixo e criei um type TValidation (poderia também ser uma interface) que retorna uma função (com retorno
// RequestHandler) e a função validation: TValidation não dará mais erro

// export const validation: RequestHandler = () => {
//     return ()=>{

//     }
// }

// export const validation: TValidation = () => {
//     return async (req,res,next)=>{
//         console.log("teste");

//     }
// }

// O método validation precisará retornar um middleware ( que é uma função ), por isso o retorno dele tem que ser
// uma função também

// Simplificando a função acima:
// export const validation: TValidation = () =>   async (req,res,next)=> { console.log("teste");  }

// export const validation: TValidation = (scheme:  SchemaOf<any>) =>   async (req,res,next)=> {
//      console.log("teste");
//          try {
//              console.log("cidade create;");
//              //validateData = await bodyValidation.validate(req.body);
//              await scheme.validate(req.query,{abortEarly:false});
//              return next();
//          } catch (error) {
//              const yupError = error as ValidationError; // Estudar melhor o "as"

//              const validationErrors: Record<string,string> = {};

//              yupError.inner.forEach(erro=>{
//                  if(!erro.path)  return;
//                 validationErrors[erro.path] = erro.message;

//              })
//              console.log(" validationErrors:::"+ JSON.stringify( validationErrors));

//             return res.status(StatusCodes.BAD_REQUEST).json({
//                  validationErrors,

//              });

//          }
//  }

export const validation: TValidation =
    (field,scheme) => async (req, res, next) => {
        console.log("método validation")
        try {
            await scheme.validate(req[field], { abortEarly: false });
            return next();
        } catch (err) {
            const yupError = err as ValidationError;
            const errors: Record<string, string> = {};
            yupError.inner.forEach((error) => {
                if (error.path === undefined) return;
                errors[error.path] = error.message;
            });

             res.status(StatusCodes.BAD_REQUEST).json({errors,  });
        }
    };