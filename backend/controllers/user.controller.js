import { errorResponse, CatchLogMessageController } from "../models/successResponse.models.js";
import { ErrorException, errorCode } from '../models/error.models.js';
import User from "../models/user.models.js";
import sendToken from '../utils/token.js';
import { scryptSync } from 'crypto';
import pkg from 'bcryptjs';

const { hashSync } = pkg

export let CreateUsercontroller = async (req, res, next) => {
  try{
    /*{username:string,email:string,password:string}*/
    let params = await User.createUser({
      username: req.fields.username,
      email: req.fields.email,
      password: (req.fields.password !== undefined)? hashSync(scryptSync(req.fields.password, 'BonsourCetaitUnTest,RetireEnProdSTP.', 24, { N: 1024 }).toString('hex'), 10) : ''
    });
    if (params.success == false) throw errorResponse(params)

    let paramsCookie = await User.createSecurityAuth(params.data.id);
    if(paramsCookie.success == false) throw errorResponse(params)

    /*{success:true,data:{token:validAuth.token}} //cookie : auth*/
    /*OR return={success:false,code:string,reason:string}*/
    return sendToken(
      { token: paramsCookie.data.token, cookieSecure: paramsCookie.data.cookieSecure, id: params.data.id},
      res,
      next
    );
  }catch(err){
    /* return={success:false,code:string,reason:string}*/
    if(err.cause === undefined) CatchLogMessageController(err, "user", "controller")
    return next(new ErrorException(err.cause.code, err.cause.reason))
  }
};

export let ReadUsercontroller = async (req, res, next) => {
  try{
    /*none*/
    let params = await User.selectUser({ id: req.UserID });
    if (params.success == false) throw errorResponse(params)
  
    return res.status(200).json(params);    
  }catch(err){
    /* return={success:false,code:string,reason:string}*/
    if(err.cause === undefined) CatchLogMessageController(err, "user", "controller")
    return next(new ErrorException(err.cause.code, err.cause.reason))
  }
};

export let UpdateUsercontroller = async (req, res, next) => {
  try{
    /*{username:string,email:string,password:string}*/
    let CookiesSecure
    let params = await User.updateUser({
      email : req.fields.email,
      username : req.fields.username,
      password: (req.fields.password !== null)? hashSync(scryptSync(req.fields.password, 'BonsourCetaitUnTest,RetireEnProdSTP.', 24, { N: 1024 }).toString('hex'), 10) : ''
    }, { id: req.UserID });
    if(params.success == false) throw errorResponse(params)
  
    CookiesSecure = await User.createSecurityAuth(req.UserID);
    if(CookiesSecure.success == false) throw errorResponse(CookiesSecure)

    /*{success:true,data:{token:validAuth.token}} //cookie : auth*/
    /*OR return={success:false,code:string,reason:string}*/      
    return sendToken(
      { token: CookiesSecure.data.token, cookieSecure: CookiesSecure.data.cookieSecure, id: req.UserID },
      res
    );
  }catch(err){
    /* return={success:false,code:string,reason:string}*/
    if(err.cause === undefined) CatchLogMessageController(err, "user", "controller")
    return next(new ErrorException(err.cause.code, err.cause.reason))
  }
};

export let DeleteUsercontroller = async (req, res, next) => {
  try{
    let params = await User.destroyUser({ id: req.UserID });
    if(params.success == false) throw errorResponse(params)

    /*return={success:true,data:{id:int,commentaire:string}}*/
    res.clearCookie("secureCookie");
    return res.status(200).json(params);
  }catch(err){
    /* return={success:false,code:string,reason:string}*/
    if(err.cause === undefined) CatchLogMessageController(err, "user", "controller")
    return next(new ErrorException(err.cause.code, err.cause.reason))
  }
};

export let ReadUserParams = async (req, res, next) => {
  try{    
    /*{email:string,password:string}*/
    let params = await User.comparePassword(
      req.fields.email,
      scryptSync(req.fields.password, 'BonsourCetaitUnTest,RetireEnProdSTP.', 24, { N: 1024 }).toString('hex')
    );
    if (params.success == false) throw errorResponse(params)
  
    /*{success:true,data:{token:validAuth.token}} //cookie : auth*/
    /*OR return={success:false,code:string,reason:string}*/
    return sendToken({cookieSecure : params.data.auth.cookieSecure, token : params.data.auth.token, id : params.data.id}, res);
  }catch(err){
    /* return={success:false,code:string,reason:string}*/
    if(err.cause === undefined) CatchLogMessageController(err, "user", "controller")
    return next(new ErrorException(err.cause.code, err.cause.reason))
  }
};

export let DeleteUserParams = async (req, res, next) => {
  try{
    res.clearCookie("auth");

    /*return={success:true,data:{commentaire:string}}*/
    return res.status(200).json({
      success: true,
      data: {
        commentaire : "Utilisateur bien déconnecté."
      },
    });
  }catch(err){
    /* return={success:false,code:string,reason:string}*/
    if(err.cause === undefined) CatchLogMessageController(err, "user", "controller")
    return next(new ErrorException(err.cause.code, err.cause.reason))
  }
};