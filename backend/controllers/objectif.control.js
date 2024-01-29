import { errorResponse, CatchLogMessageController } from "../models/successResponse.models.js";
import { ErrorException } from "../models/error.models.js";
import Objectif from "../models/objectif.models.js"

export let CreateObjectifcontroller = async (req, res, next) => {
    try{
        /*{compte_id:int,user_id:int,title:string,montant:int,montant_touch:boolean,date_cible:Date}*/
        let params = await Objectif.createObjectif({
            montant_touch: req.fields.montant_touch,
            date_cible: req.fields.date_cible,
            compte_id: req.fields.compte_id, 
            user_id: req.UserID,
            montant: req.fields.montant, 
            title: req.fields.title
        })
        if(params.success == false) throw errorResponse(params)

        /*return={success:true,data:{id:int,commentaire:string}}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "objectif", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let ReadObjectifcontroller = async (req, res, next) => {
    try{
        /*{[id:int],[compte_id:int],[user_id:int]}*/
        let params = await Objectif.selectObjectif({
            compte_id: req.fields.compte_id,
            user_id: req.fields.user_id,
            id: req.fields.id
        })
        if(params.success == false) throw errorResponse(params)

        /* return={success:true,data:objectif[]}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "objectif", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let UpdateObjectifcontroller = async (req, res, next) => {
    try{
        /*{id:int,title:string,montant:int,montant_touch:boolean,date_cible:Date}*/
        let params = await Objectif.updateObjectif(
            {
                montant_touch: req.fields.montant_touch,
                date_cible: req.fields.date_cible,
                montant: req.fields.montant, 
                title: req.fields.title
            },{
                id: req.fields.id
            }
        )
        if(params.success == false) throw errorResponse(params)

        /*return={success:true,data:{id:int,commentaire:string}}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "objectif", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let DeleteObjectifcontroller = async (req, res, next) => {
    try{
        /*{[id:int], [compte_id:int],[user_id:int]}*/
        let params = await Objectif.destroyObjectif({
            compte_id: req.fields.compte_id,
            user_id: req.fields.user_id,
            id: req.fields.id
        })
        if(params.success == false) throw errorResponse(params)

        /*return={success:true,data:{id:int,commentaire:string}}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "objectif", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}