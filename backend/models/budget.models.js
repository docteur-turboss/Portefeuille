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
      if(Object.keys(params).length === 0) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Merci de donner au moins une valeur de modification.",
      })

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
      if (Object.keys(condition).length === 0) return CatchErrorMessage(false, {
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
      if (Object.keys(condition).length === 0) return CatchErrorMessage(false, {
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
    if (params.montant === undefined && params.rollover === undefined) throw errorResponse({reason: "Merci de bien argumenter les champs lors de vos créations ou modifications."})

    if(params.user_id && isNaN(parseInt(params.user_id))){
      throw errorResponse({reason : "L'identifiant d'utilisateur doit être un nombre"})
    }else if(params.user_id) {
      let isRealUser = await VerifTable("user", params.user_id)
      if(isRealUser.success == false) throw errorResponse({reason:"Utilisateur invalide"})
    }

    if(params.category_id && isNaN(parseInt(params.category_id))){
      throw errorResponse({reason : "L'identifiant de catégorie doit être un nombre"})
    }else if(params.category_id){
      let isRealCategory = await VerifTable("category", params.category_id)
      let dbInfo = await db("budget").select("id").where({ category_id: params.category_id });
      dbInfo = await dbInfo[0];

      if(isRealCategory.success == false || dbInfo !== undefined) throw errorResponse({reason:"Catégorie invalide ou déjà utilisé"})
    }
    
    if(params.montant && (isNaN(parseInt(params.montant)) || params.montant <= 0)) throw errorResponse({reason:"Le montant est un nombre positif"})

    if(params.rollover !== undefined && (params.rollover !== true && params.rollover !== false)) throw errorResponse({reason:"La valeur de rollover est invalide"})
    if(params.rollover !== undefined && params.rollover == true){ params.rollover = 1}
    if(params.rollover !== undefined && params.rollover == false){ params.rollover = 0}

    return suppNotUsed(params);
  };
};
