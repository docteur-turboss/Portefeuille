import { errorResponse, CatchLogMessageController } from "../models/successResponse.models.js";
import { ErrorException } from "../models/error.models.js";
import Budget from "../models/budget.models.js";

export let CreateBudgetcontroller = async (req, res, next) => {
    try{
        /*{category_id:int,user_id:int,montant:int, rollover:boolean}*/
        let params = await Budget.createBudget({
            category_id: req.fields.category_id, 
            rollover: req.fields.rollover, 
            montant: req.fields.montant, 
            user_id: req.UserID
        })
        if(params.success == false) throw errorResponse(params)
        
        /*return={success:true,data:{id:int,commentaire:string}}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "budget", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let ReadBudgetcontroller = async (req, res, next) => {
    try{
        /*{[id:int],[category_id:int],[user_id:int]}*/
        let params = await Budget.selectBudget({
            category_id: req.fields.category_id,
            user_id: req.fields.user_id,
            id: req.fields.id
        })
        if(params.success == false) throw errorResponse(params)
        
        /* return={success:true,data:budget[]}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "budget", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let UpdateBudgetcontroller = async (req, res, next) => {
    try{
        /*{[id:int],[montant:int],[rollover:boolean]}*/
        let params = await Budget.updateBudget(
            {
                montant: req.fields.montant, 
                rollover: req.fields.rollover
            },{
                id: req.fields.id
            }
        )
        if(params.success == false) throw errorResponse(params)
        
        /*return={success:true,data:{id:int,commentaire:string}}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "budget", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let DeleteBudgetcontroller = async (req, res, next) => {
    try{
        /*{[id:int],[category_id:int],[user_id:int]}*/
        let params = await Budget.destroyBudget({
            id: req.fields.id, 
            user_id: req.fields.user_id,
            category_id: req.fields.category_id
        })
        if(params.success == false) throw errorResponse(params)
        
        /*return={success:true,data:{id:int,commentaire:string}}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "budget", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}