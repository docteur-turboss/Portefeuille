import {ReturnMessageCUP, CatchErrorMessage, errorResponse} from "./successResponse.models.js";
import suppNotUsed from "../utils/deleteParamsNotUsed.js";
import VerifTable from "../utils/VerifTable.js";
import { errorCode } from "./error.models.js";
import db from "../config/db.js";

export default class Budget {
  static createBudget = async (params = { category_id, user_id, montant:0, rollover:false }) => {
    try {
      let paramsObj = await Budget.modelNormilizer(params, true);
      let result_Id = await db("budget")
      .insert( paramsObj, ["id"]);

      return ReturnMessageCUP(result_Id[0], "Budget créé")
    } catch (err) {
      if(err.cause === undefined){
        return CatchErrorMessage(true,{functionErrorName: "CREATE BUDGET", totalErrParams: err, basefilename:"budget", basedirname: "models"})
      }else{
        return CatchErrorMessage(false, {code: err.cause.code, reason: err.cause.reason})
      }
    }
  };

  static updateBudget = async (params = { montant, rollover }, condition = { id }) => {
    try {
      let paramsObj = await Budget.modelNormilizer(params);
      let return_Id = await db("budget")
      .update(paramsObj, ["id"])
      .where(condition);

      return ReturnMessageCUP(return_Id[0], "Budget bien modifié.")
    } catch (err) {
      if(err.cause === undefined){
        return CatchErrorMessage(true,{functionErrorName: "UPDATE BUDGET", totalErrParams: err, basefilename:"budget", basedirname: "models"})
      }else{
        return CatchErrorMessage(false, {code: err.cause.code, reason: err.cause.reason})
      }
    }
  }

  static destroyBudget = async (condition = { id, category_id, user_id }) => {
    try {
      if (condition.id == undefined && condition.category_id == undefined && condition.user_id == undefined) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Certaines informations obligatoires sont manquantes.",
      })

      condition = suppNotUsed(condition)

      let select_info = await Budget.selectBudget(condition);
      if (select_info.success == false) return select_info

      let return_Id = await db("budget")
      .where(condition)
      .del(["id"]);

      return ReturnMessageCUP(return_Id[0], "Budget bien détruit.")
    } catch (err) {
      return CatchErrorMessage(true,{functionErrorName: "DESTROY BUDGET", totalErrParams: err, basefilename:"budget", basedirname: "models"})
    }
  }

  static selectBudget = async (condition = { id, user_id, category_id }) => {
    try {
        if(condition.id == undefined && condition.category_id == undefined && condition.user_id == undefined) return CatchErrorMessage(false, {
          code: errorCode.NotAcceptable,
          reason: "Des paramètres obligatoires sont manquants."
        })
        
        condition = suppNotUsed(condition)

        let select_info = await db("budget").select("*").where(condition);

        if (select_info[0] == undefined) return CatchErrorMessage(false, {
          code: errorCode.NotFound,
          reason: "Budget introuvable.",
        })
        
        return {
            success: true,
            data: select_info
        };
    } catch (err) {
      return CatchErrorMessage(true,{functionErrorName: "SELECT BUDGET", totalErrParams: err, basefilename:"budget", basedirname: "models"})
    }
  }

  /* normalise la data */
  static modelNormilizer = async ( params = { category_id, user_id, montant, rollover}, obligatoire = false ) => {
    if (obligatoire == true && (!params.category_id || !params.user_id)) throw errorResponse({reason:"Certains paramètres obligatoire sont manquants."});

    if(params.user_id) {
      let isRealUser = await VerifTable("user", params.user_id)
      if(isRealUser.success == false) throw errorResponse({reason:"Utilisateur invalide"})
    }

    if(params.category_id){
      let isRealCategory = await VerifTable("category", params.category_id)
      if(isRealCategory.success == false) throw errorResponse({reason:"Catégorie invalide"})
    }

    if(params.montant && (parseInt(params.montant) === NaN || params.montant <= 0)) throw errorResponse({reason:"Le montant est un nombre positif"})

    if(params.rollover && (params.rollover !== true && params.rollover !== false)) throw errorResponse({reason:"La valeur de rollover est invalide"})
    if(params.rollover && params === true) params.rollover = 1
    if(params.rollover && params === false) params.rollover = 0

    return suppNotUsed(params);
  };
};
