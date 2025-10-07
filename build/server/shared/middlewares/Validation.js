"use strict";
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
exports.validation = void 0;
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
const validation = 
// (field,scheme) => async (req, res, next) => {
(schemas) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("método validation - schemas:: " + JSON.stringify(schemas));
    // try {
    //     //await scheme.validate(req[field], { abortEarly: false });
    //     await arg.header.
    //     return next();
    // } catch (err) {
    //     const yupError = err as ValidationError;
    //     const errors: Record<string, string> = {};
    //     yupError.inner.forEach((error) => {
    //         if (error.path === undefined) return;
    //         errors[error.path] = error.message;
    //     });
    //      res.status(StatusCodes.BAD_REQUEST).json({errors,  });
    // }
    return next();
});
exports.validation = validation;
