import { CatchErrorMessage, ReturnMessageCUP, errorResponse } from './successResponse.models.js';
import suppNotUsed from '../utils/deleteParamsNotUsed.js';
import { errorCode } from "./error.models.js";
import Category from './category.models.js';
import Compte from './compte.models.js';
import validator from "email-validator";
import { scryptSync } from "crypto";
import db from "../config/db.js";
import pkg from "bcryptjs";

const { hashSync, compare } = pkg;

export default class User {
  static createUser = async (params = {username, email, password}) => {
    try {
      let paramsObj = await User.modelNormilizer(params, true);
      let result_Id = await db("user")
      .insert(paramsObj, ["id"]);
      
      return ReturnMessageCUP(result_Id[0], "Utilisateur crée")
    } catch (err) {
      if(err.cause === undefined){
        return CatchErrorMessage(true,{functionErrorName: "CREATE USER", totalErrParams: err, basefilename: "user", basedirname: "models"});
      }else{
        return CatchErrorMessage(false, {code: err.cause.code, reason: err.cause.reason});
      }
    }
  }

  static updateUser = async (params = { username, email, password }, condition = { id, email }) => {
    try {
      if(Object.keys(params).length === 0 || (params.username == null && params.email == null && params.password == "")) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Merci de donner au moins une valeur de modification.",
      })

      let paramsObj = await User.modelNormilizer(params);
      let return_Id = await db("user")
      .update(paramsObj, ["id"])
      .where(condition);

      return ReturnMessageCUP(return_Id[0], "Utilisateur bien modifié.")
    } catch (err) {
      if(err.cause === undefined){
        return CatchErrorMessage(true,{functionErrorName: "UPDATE USER", basefilename: "user", totalErrParams: err, basedirname: "models"});
      }else{
        return CatchErrorMessage(false, {code: err.cause.code, reason: err.cause.reason});
      }
    }
  }

  static destroyUser = async (condition = { id, email }) => {
    try {
      if(Object.keys(condition).length === 0) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Certaines informations obligatoires sont manquantes.",
      })

      condition = suppNotUsed(condition);

      let select_info = await User.selectUser(condition);
      if (select_info.success == false) return select_info;

      await Compte.destroyCompte({user_id : select_info.data[0].id})
      await Category.destroyCategory({user_id : select_info.data[0].id})

      let return_Id = await db("user")
      .where(condition)
      .del(["id"]);

      return ReturnMessageCUP(return_Id[0], "Utilisateur bien détruit.")
    } catch (err) {
      return CatchErrorMessage(true,{functionErrorName: "DESTROY USER", totalErrParams: err, basefilename:"user", basedirname: "models"})
    }
  }

  static selectUser = async (condition = { id: undefined, email: undefined, del:true }) => {
    try {
      if(condition.id == undefined && condition.email == undefined)  return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Des paramètres obligatoires sont manquants."
      })

      condition = suppNotUsed(condition);

      let select_info = await db("user").select("*").where(condition);
      
      if (select_info[0] == undefined) return CatchErrorMessage(false, {
        code: errorCode.NotFound,
        reason: "Utilisateur introuvable."
      })
      
      for(let i = 0; i < select_info.length; i++){
        delete select_info[i].password
        if(condition.del == true){
          delete select_info[i].token
          delete select_info[i].cookieSecure
        }
      }

      return {
        success: true,
        data: select_info
      };
    } catch (err) {
      return CatchErrorMessage(true,{functionErrorName: "SELECT USER", totalErrParams: err, basefilename:"user", basedirname: "models"})
    }
  }

  /* algorithm de création du cookie de sécurité et du token*/
  static createSecurityAuth = async (idUser) => {
    try {
      let user = await User.selectUser({id : idUser });
      if(user.success == false) throw user
      let email = user.data[0].email;

      let firstParToken = Buffer.from(`${idUser}`, "utf-8").toString("base64url") + ".";
      let secondParToken = Buffer.from(`${Date.now() - new Date(2022, 2, 27, 18).getTime()}`, "utf-8").toString("base64url") + ".";
      let endToken = Buffer.from(
        `${hashSync(scryptSync(email, "BonsourCetaitUnTest,RetireEnProdSTP.", 24, {N: 1024,}).toString("hex"),10)}`
        ,"utf-8"
      ).toString("base64url");
      let Completetoken = firstParToken + secondParToken + endToken;
      let CompleteCookie = Buffer.from(
        `${hashSync(scryptSync(`${firstParToken+secondParToken+Buffer.from(`${Completetoken}`, "utf-8").toString("base64url")}`, "BonsourCetaitUnTest,RetireEnProdSTP.",24,{ N: 1024 }).toString("hex"),10)}`,"utf-8"
      ).toString("base64url");

      await db("user")
        .update(
          {
            token: Completetoken,
            cookieSecure: CompleteCookie,
          },
          ["id"]
        )
        .where({ id: idUser });

      return {
        success: true,
        data: { 
          token: Completetoken,
          cookieSecure: CompleteCookie
        },
      };
    } catch (err) {
      if(err.cause === undefined){
        return CatchErrorMessage(true,{functionErrorName: "CREATE SECURITY AUTH", totalErrParams: err, basefilename:"user", basedirname: "models"})
      }else{
        return CatchErrorMessage(false, {code: err.cause.code, reason: err.cause.reason})
      }
    }
  }

  static comparePassword = async (email, password) => {
    try {
      let result = await db("user")
      .select("id", "password", "token", "cookieSecure")
      .where({email: email});

      if (result[0] &&(await compare(password, result[0].password)) == true) return {
        success: true,
        data: {
          id : result[0].id,
          auth : {
            token: result[0].token,
            cookieSecure: result[0].cookieSecure,
          },
          commentaire : "Utilisateur bien connecté."
        },
      };

      return {
        success: false,
        reason: "Email ou Mot de passe invalide.",
        code: errorCode.Unauthorized,
      };
    } catch (err) {
      return CatchErrorMessage(true,{functionErrorName: "COMPARE PASSWORD", totalErrParams: err, basefilename:"user", basedirname: "models"})
    }
  }

  static  modelNormilizer = async ( params = { username, email, password },obligatoire = false) => {
    if (obligatoire == true && (!params.username || !params.password || !params.username)) throw errorResponse({reason:"Certaines informations obligatoires sont manquantes."})

    if (params.email) {
      params.email = params.email.toLowerCase()
      if (!validator.validate(params.email)) throw errorResponse({reason:"Votre email est invalide."})

      let userInfo = await User.selectUser({email: params.email});
      if (userInfo.success !== false) throw errorResponse({reason:"Email déjà utilisé."})
    }

    if (params.username && (params.username.length < 3 || params.username.length > 50)) throw errorResponse({reason:"Le pseudo ne doit pas faire plus de 50 caractère ou moins de 3."})
    return suppNotUsed(params);
  }
}