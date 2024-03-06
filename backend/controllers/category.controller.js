import { errorResponse, CatchLogMessageController } from "../models/successResponse.models.js";
import { ErrorException } from "../models/error.models.js";
import Category from "../models/category.models.js"

export let CreateCategorycontroller = async (req, res, next) => {
    try{
        /*{user_id:int, name:string, type:int}*/
        let params = await Category.createCategory({
            name: req.fields.name, 
            type: req.fields.type, 
            user_id: req.UserID
        })
        if(params.success == false) throw errorResponse(params)

        /*return={success:true,data:{id:int,commentaire:string}}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "category", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let ReadCategorycontroller = async (req, res, next) => {
    try{
        /*{[id:int],[user_id:int]}*/
        let params = await Category.selectCategory({
            user_id: req.fields.user_id,
            id: req.fields.id
        })
        if(params.success == false) throw errorResponse(params)

        /* return={success:true,data:category[]}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "category", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let UpdateCategorycontroller = async (req, res, next) => {
    try{
        /*{name:string, type:int, id:int}*/
        let params = await Category.updateCategory(
            {
                name: req.fields.name, 
            },{
                id: req.fields.id
            }
        )
        if(params.success == false) throw errorResponse(params)

        /*return={success:true,data:{id:int,commentaire:string}}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "category", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}

export let DeleteCategorycontroller = async (req, res, next) => {
    try{
        /*{[id:int],[user_id:int]}*/
        let params = await Category.destroyCategory({
            id: req.fields.id, 
            user_id: req.fields.user_id
        })
        if(params.success == false) throw errorResponse(params)

        /*return={success:true,data:{id:int,commentaire:string}}*/
        return res.status(200).json(params)
    }catch(err){
        /* return={success:false,code:string,reason:string}*/
        if(err.cause === undefined) CatchLogMessageController(err, "category", "controller")
        return next(new ErrorException(err.cause.code, err.cause.reason))
    }
}