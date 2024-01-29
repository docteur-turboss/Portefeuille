import {  errorResponse, CatchLogMessageController } from "../models/successResponse.models.js";
import { ErrorException } from "../models/error.models.js";
import Facture from "../models/facture.models.js"

export let CreateFacturecontroller = async (req, res, next) => {
    try{
        /*{category_id:int, user_id:int, compte_id:int,  title:string,  montant:int, repetition:boolean,auto:boolean, status:boolean, [rappel:Date,] date:Date}*/
        let params = await Facture.createFacture({
            category_id: req.fields.category_id, 
            repetition: req.fields.repetition, 
            compte_id: req.fields.compte_id, 
            user_id: req.fields.user_id, 
            montant: req.fields.montant, 
            status: req.fields.status, 
            rappel: req.fields.rappel, 
            title: req.fields.title, 
            auto: req.fields.auto, 
            date: req.fields.date, 
            type: req.fields.type
        })
        if(params.success == false) throw errorResponse(params)

        /*return={success:true,data:{id:int,commentaire:string}}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "facture", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let ReadFacturecontroller = async (req, res, next) => {
    try{
        /*{[id:int], [category_id:int], [user_id:int], [compte_id:int]}*/
        let params = await Facture.selectFacture({
            category_id: req.fields.category_id,
            compte_id: req.fields.compte_id,
            user_id: req.fields.user_id,
            id: req.fields.id
        })
        if(params.success == false) throw errorResponse(params)

        /* return={success:true,data:facture[]}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "facture", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let UpdateFacturecontroller = async (req, res, next) => {
    try{
        /*{id:int,category_id:int,compte_id:int,title:string,  montant:int,repetition:boolean,auto:boolean, status:boolean,date:Date,[rappel:Date,]}*/
        let params = await Facture.updateFacture(
            {
                category_id: req.fields.category_id, 
                repetition: req.fields.repetition, 
                compte_id: req.fields.compte_id, 
                montant: req.fields.montant, 
                status: req.fields.status, 
                rappel: req.fields.rappel, 
                title: req.fields.title, 
                auto: req.fields.auto, 
                date: req.fields.date, 
                type: req.fields.type
            },{
                id: req.fields.id
            }
        )
        if(params.success == false) throw errorResponse(params)

        /*return={success:true,data:{id:int,commentaire:string}}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "facture", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let DeleteFacturecontroller = async (req, res, next) => {
    try{
        /*{[id:int], [category_id:int], [user_id:int], [compte_id:int]}*/
        let params = await Facture.destroyFacture({
            category_id: req.fields.category_id,
            compte_id: req.fields.compte_id,
            user_id: req.fields.user_id,
            id: req.fields.id
        })
        if(params.success == false) throw errorResponse(params)

        /*return={success:true,data:{id:int,commentaire:string}}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "facture", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}