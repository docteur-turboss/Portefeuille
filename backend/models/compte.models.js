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
        return CatchErrorMessage(true,{functionErrorName: "CREATE COMPTE", totalErrParams: err, basefilename: "compte", basedirname: "models"});
      }else{
        return CatchErrorMessage(false, {code: err.cause.code, reason: err.cause.reason});
      }
    }
  };

  static updateCompte = async (params = {montant: 0}, condition = { id }) => {
    try {
      if(Object.keys(params).length === 0) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Merci de donner au moins une valeur de modification.",
      })
      
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

  static destroyCompte = async (condition = {id, user_id}) => {
    try {
      if(Object.keys(condition).length === 0) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Certaines informations obligatoires sont manquantes.",
      })

      condition = suppNotUsed(condition)

      let select_info = await Compte.selectCompte(condition);
      if (select_info.success == false) return select_info;

      await Objectif.destroyObjectif({compte_id : select_info.data[0].id})
      await Transaction.destroyTransaction({compte_id : select_info.data[0].id})
      await Facture.destroyFacture({compte_id : select_info.data[0].id})

      let return_Id = await db("compte")
      .where(condition)
      .del(["id"]);

      return ReturnMessageCUP(return_Id[0], "Compte bien détruit.")
    } catch (err) {
      return CatchErrorMessage(true,{functionErrorName: "DESTROY COMPTE", totalErrParams: err, basefilename: "compte", basedirname: "models"})
    }
  }

  static selectCompte = async (condition = {id, user_id}) => {
    try {
      if(Object.keys(condition).length === 0) return CatchErrorMessage(false, {
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
      return CatchErrorMessage(true,{functionErrorName: "SELECT COMPTE", totalErrParams: err, basefilename:"compte", basedirname: "models"})
    }
  }

  /* normalise la data */
  static modelNormilizer = async ( params = {user_id, montant, type}, obligatoire = false ) => {
    if (obligatoire == true && ((!params.montant && params.montant !== 0)|| !params.user_id || !params.type)) throw errorResponse({reason:"Certains paramètres obligatoire sont manquants."});

    if(params.user_id){
      let isRealUser = await VerifTable("user", params.user_id)
      if(isRealUser.success == false) throw errorResponse({reason:"Utilisateur invalide"})
    }

    if(params.type && (isNaN(parseInt(params.type)) || params.type > 17 || params.type <= 0)) throw errorResponse({reason:"Le type n'est pas valide"})

    if(params.montant && isNaN(parseInt(params.montant))) throw errorResponse({reason:"Le montant doit être un nombre"})

    return suppNotUsed(params);
  };
};