import {ReturnMessageCUP, CatchErrorMessage, errorResponse} from "./successResponse.models.js";
import suppNotUsed from "../utils/deleteParamsNotUsed.js";
import Transaction from "./transaction.models.js";
import VerifTable from "../utils/VerifTable.js";
import { errorCode } from "./error.models.js";
import Objectif from "./objectif.models.js";
import db from "../config/db.js";
import Facture from "./facture.models.js";

export default class Compte {
  static createCompte = async (params = {user_id, montant:0, type}) => {
    try {
      let paramsObj = await Compte.modelNormilizer(params, true);
      let result_Id = await db("compte")
      .insert(paramsObj,["id"]);
      
      return ReturnMessageCUP(result_Id[0], "Compte crée");
    } catch (err) {
      if(err.cause === undefined){
        return CatchErrorMessage(true,{functionErrorName: "CREATE COMPTE", totalErrParams: err, basefilename: "category", basedirname: "models"});
      }else{
        return CatchErrorMessage(false, {code: err.cause.code, reason: err.cause.reason});
      }
    }
  };

  static updateCompte = async (params = {montant: 0}, condition = { id }) => {
    try {
      let paramsObj = await Compte.modelNormilizer(params);
      let return_Id = await db("compte")
        .update(paramsObj, ["id"])
        .where(condition);

      return ReturnMessageCUP(return_Id[0], "Compte bien modifié.");
    } catch (err) {
      if(err.cause === undefined){
        return CatchErrorMessage(true,{functionErrorName: "UPDATE COMPTE", basefilename: "compte", totalErrParams: err, basedirname: "models"});
      }else{
        return CatchErrorMessage(false, {code: err.cause.code, reason: err.cause.reason});
      }
    }
  }

  static destroyCompte = async (condition = { id, user_id }) => {
    try {
      if (condition.id == undefined && condition.user_id == undefined) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Certaines informations obligatoires sont manquantes."
      })

      condition = suppNotUsed(condition)

      let select_info = await Compte.selectCompte(condition);
      if (select_info.success == false) return select_info;

      Objectif.destroyObjectif({compte_id : select_info.data[0].id})
      Transaction.destroyTransaction({compte_id : select_info.data[0].id})
      Facture.destroyFacture({compte_id : select_info.data[0].id})

      let return_Id = await db("budget")
      .where(condition)
      .del(["id"]);

      return ReturnMessageCUP(return_Id[0], "Compte bien détruit.")
    } catch (err) {
      return CatchErrorMessage(true,{functionErrorName: "DESTROY COMPTE", totalErrParams: err, basefilename: "compte", basedirname: "models"})
    }
  }

  static selectCompte = async (condition = { id, user_id  }) => {
    try {
      if(condition.id == undefined && condition.user_id == undefined) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Des paramètres obligatoires sont manquants."
      })

      condition = suppNotUsed(condition)

      let select_info = await db("compte").select("*").where(condition);

      if (select_info[0] == undefined) return CatchErrorMessage(false, {
        code: errorCode.NotFound,
        reason: "Compte introuvable."
      })

      return {
          success: true,
          data: select_info,
      };
    } catch (err) {
      return CatchErrorMessage(true,{functionErrorName: "SELECT CATEGORY", totalErrParams: err, basefilename:"compte", basedirname: "models"})
    }
  }

  /* normalise la data */
  static modelNormilizer = async ( params = {user_id, montant, type}, obligatoire = false ) => {
    if (obligatoire == true && (!params.montant || !params.user_id || !params.type)) return errorResponse({reason:"Certains paramètres obligatoire sont manquants."});

    if(params.user_id){
      let isRealUser = await VerifTable("user", params.user_id)
      if(isRealUser.success == false) return errorResponse({reason:"Utilisateur invalide"})
    }

    if(params.type && (parseInt(params.type) === NaN || params.type > 4 || params.type <= 0)) return errorResponse({reason:"Le type n'est pas valide"})

    if(params.montant && (parseInt(params.montant) === NaN)) return errorResponse({reason:"Le montant doit être un nombre"})
    
    return suppNotUsed(params);
  };
};