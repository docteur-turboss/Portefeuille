import {ReturnMessageCUP, CatchErrorMessage, errorResponse} from "./successResponse.models.js";
import suppNotUsed from "../utils/deleteParamsNotUsed.js";
import VerifTable from "../utils/VerifTable.js";
import { errorCode } from "./error.models.js";
import db from "../config/db.js";

export default class Facture {
  static createFacture = async (params = {category_id, user_id, compte_id, montant, repetition, date, title, rappel, auto, status: undefined}) => {
    try {
      let paramsObj = await Facture.modelNormilizer(params, true);
      let result_Id = await db("facture")
      .insert(paramsObj, ["id"]);
      
      return ReturnMessageCUP(result_Id[0], "Facture crée");
    } catch (err) {
      if(err.cause === undefined){
        return CatchErrorMessage(true,{functionErrorName: "CREATE FACTURE", totalErrParams: err, basefilename: "facture", basedirname: "models"});
      }else{
        return CatchErrorMessage(false, {code: err.cause.code, reason: err.cause.reason});
      }
    }
  };

  static updateFacture = async (params = {category_id, compte_id, montant, repetition, date, title, rappel, auto, status: undefined}, condition = { id }) => {
    try {
      let paramsObj = await Facture.modelNormilizer(params);
      let return_Id = await db("facture")
        .update(paramsObj, ["id"])
        .where(condition);

      return ReturnMessageCUP(return_Id[0], "Facture bien modifié.");
    } catch (err) {
      if(err.cause === undefined){
        return CatchErrorMessage(true,{functionErrorName: "UPDATE FACTURE", basefilename: "facture", totalErrParams: err, basedirname: "models"});
      }else{
        return CatchErrorMessage(false, {code: err.cause.code, reason: err.cause.reason});
      }
    }
  }

  static destroyFacture = async (condition = { id, category_id, user_id, compte_id }) => {
    try {
      if (condition.id == undefined && condition.category_id == undefined && condition.compte_id == undefined && condition.user_id == undefined) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Certaines informations obligatoires sont manquantes."
      })

      condition = suppNotUsed(condition)

      let select_info = await Facture.selectCategory(condition);
      if (select_info.success == false) return select_info;

      let return_Id = await db("facture")
      .where(condition)
      .del(["id"]);

      return ReturnMessageCUP(return_Id[0], "Facture bien détruit.")
    } catch (err) {
      return CatchErrorMessage(true,{functionErrorName: "DESTROY FACTURE", totalErrParams: err, basefilename: "facture", basedirname: "models"})
    }
  }

  static selectFacture = async (condition = { id, category_id, user_id, compte_id }) => {
    try {
      if (condition.id == undefined && condition.category_id == undefined && condition.compte_id == undefined && condition.user_id == undefined) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Certaines informations obligatoires sont manquantes."
      })

      condition = suppNotUsed(condition)

      let select_info = await db("facture").select("*").where(condition);

      if (select_info[0] == undefined) return CatchErrorMessage(false, {
        code: errorCode.NotFound,
        reason: "Facture introuvable."
      })

      return {
          success: true,
          data: select_info,
      };
    } catch (err) {
      return CatchErrorMessage(true,{functionErrorName: "SELECT FACTURE", totalErrParams: err, basefilename:"facture", basedirname: "models"})
    }
  }

  /* normalise la data */
  static modelNormilizer = async (params = {category_id, user_id, compte_id, montant, repetition, date, title, auto, status: undefined, rappel}, obligatoire = false ) => {
    if (obligatoire == true && (!params.category_id || !params.user_id || !params.compte_id || !params.montant || !params.repetition || !params.date || !params.title || !params.auto || !params.auto || !params.status)) throw errorResponse({reason:"Certains paramètres obligatoire sont manquants."});

    if(params.category_id){
      let isRealCategory = await VerifTable("category", params.category_id);
      if(isRealCategory.success == false) throw errorResponse({reason:"Catégorie invalide"});
    }
    
    if(params.user_id){
      let isRealUser = await VerifTable("user", params.user_id);
      if(isRealUser.success == false) throw errorResponse({reason:"Utilisateur invalide"})
    }
    
    if(params.compte_id){
      let isRealCompte = await VerifTable("compte", params.compte_id);
      if(isRealCompte.success == false) throw errorResponse({reason:"Compte invalide"})
    }
    
    if(params.title && (params.title.length < 3 || params.title.length > 40 )) throw errorResponse({reason:"Le titre doit contenir plus de 3 caractère et moins de 40 caractère"})
    
    if(params.montant && (parseInt(params.montant) === NaN || params.montant <= 0)) throw errorResponse({reason:"Le montant doit être un nombre positif"})
    
    if(params.repetition && (params.repetition !== true && params.repetition !== false)) throw errorResponse({reason:"La valeur de la répétition est invalide"})
    if(params.repetition && params.repetition === true) params.repetition = 1
    if(params.repetition && params.repetition === false) params.repetition = 0
    
    if(params.auto && (params.auto !== true && params.auto !== false)) throw errorResponse({reason:"La valeur du paiement automatique est invalide"})
    if(params.auto && params.auto === true) params.auto = 1
    if(params.auto && params.auto === false) params.auto = 0

    if(params.status && (params.status !== true && params.status !== false)) throw errorResponse({reason:"La valeur du status de paiement de la facture est invalide"})
    if(params.status && params.status === true) params.status = 1
    if(params.status && params.status === false) params.status = 0

    if(params.rappel && !(params.rappel instanceof Date && !isNaN(params.rappel))) throw errorResponse({reason:"La valeur du rappel est invalide"})

    if(params.date && !(params.date instanceof Date && !isNaN(params.date))) throw errorResponse({reason:"La date est invalide"})

    return suppNotUsed(params);
  };
};