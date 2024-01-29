import { errorResponse, CatchLogMessageController } from "../models/successResponse.models.js";
import { ErrorException } from "../models/error.models.js";
import Compte from "../models/compte.models.js"

export let CreateComptecontroller = async (req, res, next) => {
    try{
        /*{user_id:int, montant:int, type:int}*/
        let params = await Compte.createCompte({
            montant: req.fields.montant, 
            user_id: req.UserID,
            type: req.fields.type
        })
        if(params.success == false) throw errorResponse(params)

        /*return={success:true,data:{id:int,commentaire:string}}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "compte", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let ReadComptecontroller = async (req, res, next) => {
    try{
        /*{[id:int],[user_id:int]}*/
        let params = await Compte.selectCompte({
            user_id: req.fields.user_id,
            id: req.fields.id
        })
        if(params.success == false) throw errorResponse(params)

        /* return={success:true,data:compte[]}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "compte", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let UpdateComptecontroller = async (req, res, next) => {
    try{
        /*{montant:int, type:int, id:int}*/
        let params = await Compte.updateCompte(
            {
                montant: req.fields.montant, 
            },{
                id: req.fields.id
            }
        )
        if(params.success == false) throw errorResponse(params)

        /*return={success:true,data:{id:int,commentaire:string}}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "compte", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let DeleteComptecontroller = async (req, res, next) => {
    try{
        /*{[id:int],[user_id:int]}*/
        let params = await Compte.destroyCompte({
            id: req.fields.id, 
            user_id: req.fields.user_id
        })
        if(params.success == false) throw errorResponse(params)

        /*return={success:true,data:{id:int,commentaire:string}}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "compte", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}