import { errorResponse, CatchLogMessageController } from "../models/successResponse.models.js";
import { ErrorException } from "../models/error.models.js";
import Transaction from "../models/transaction.models.js"

export let CreateTransactioncontroller = async (req, res, next) => {
    try{
        /*{category_id:int,user_id:int,montant:int,type:int,date:Date,[compte_id:int,][toaccount:int,][commentaire:string,]}*/
        let params = await Transaction.createTransaction({
            category_id: req.fields.category_id,
            user_id: req.fields.user_id,
            compte_id: req.fields.compte_id,
            toaccount: req.fields.toaccount, 
            montant: req.fields.montant,
            commentaire: req.fields.commentaire,
            type: req.fields.type, 
            date: req.fields.date
        })
        if(params.success == false) throw errorResponse(params)

        /*return={success:true,data:{id:int,commentaire:string}}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "transaction", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let ReadTransactioncontroller = async (req, res, next) => {
    try{
        /*{[id:int], [category_id:int], [user_id:int], [compte_id:int]}*/
        let params = await Transaction.selectTransaction({
            category_id: req.fields.category_id,
            compte_id: req.fields.compte_id,
            user_id: req.fields.user_id,
            id: req.fields.id
        })
        if(params.success == false) throw errorResponse(params)

        /* return={success:true,data:transaction[]}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "transaction", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let UpdateTransactioncontroller = async (req, res, next) => {
    try{
        /*{id:int,category_id:int,compte_id:string,montant:int,date:Date,[commentaire:string,][toaccount:int,]}*/
        let params = await Transaction.updateTransaction(
            {
                category_id: req.fields.category_id,
                commentaire: req.fields.commentaire,
                compte_id: req.fields.compte_id,
                toaccount: req.fields.toaccount,
                montant: req.fields.montant, 
                date: req.fields.date,
            },{
                id: req.fields.id
            }
        )
        if(params.success == false) throw errorResponse(params)

        /*return={success:true,data:{id:int,commentaire:string}}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "transaction", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let DeleteTransactioncontroller = async (req, res, next) => {
    try{
        /*{[id:int], [category_id:int], [user_id:int], [compte_id:int]}*/
        let params = await Transaction.destroyTransaction({
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
        if(err.cause === undefined) CatchLogMessageController(err, "transaction", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}