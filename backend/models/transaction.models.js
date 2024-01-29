import {ReturnMessageCUP, CatchErrorMessage, errorResponse} from "./successResponse.models.js";
import suppNotUsed from "../utils/deleteParamsNotUsed.js";
import VerifTable from "../utils/VerifTable.js";
import { errorCode } from "./error.models.js";
import db from "../config/db.js";

export default class Transaction {
  static createTransaction = async (params = {category_id, user_id, compte_id, montant, type, date, commentaire, toaccount}) => {
    try {
      let paramsObj = await Transaction.modelNormilizer(params, true);
      let result_Id = await db("transaction")
      .insert(paramsObj, ["id"]);
      
      return ReturnMessageCUP(result_Id[0], "Transaction crée");
    } catch (err) {
      if(err.cause === undefined){
        return CatchErrorMessage(true,{functionErrorName: "CREATE TRANSACTION", totalErrParams: err, basefilename: "transaction", basedirname: "models"});
      }else{
        return CatchErrorMessage(false, {code: err.cause.code, reason: err.cause.reason});
      }
    }
  };

  static updateTransaction = async (params = {category_id, compte_id, montant, date, commentaire, toaccount}, condition = { id }) => {
    try {
      let paramsObj = await Transaction.modelNormilizer(params);
      let return_Id = await db("transaction")
        .update(paramsObj, ["id"])
        .where(condition);

      return ReturnMessageCUP(return_Id[0], "Transaction bien modifié.");
    } catch (err) {
      if(err.cause === undefined){
        return CatchErrorMessage(true,{functionErrorName: "UPDATE TRANSACTION", basefilename: "transaction", totalErrParams: err, basedirname: "models"});
      }else{
        return CatchErrorMessage(false, {code: err.cause.code, reason: err.cause.reason});
      }
    }
  }

  static destroyTransaction = async (condition = { id, category_id, user_id, compte_id }) => {
    try {
      if (condition.id == undefined && condition.category_id == undefined && condition.compte_id == undefined && condition.user_id == undefined) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Certaines informations obligatoires sont manquantes."
      })

      condition = suppNotUsed(condition)

      let select_info = await Transaction.selectCategory(condition);
      if (select_info.success == false) return select_info;

      let return_Id = await db("transaction")
      .where(condition)
      .del(["id"]);

      return ReturnMessageCUP(return_Id[0], "Transaction bien détruit.")
    } catch (err) {
      return CatchErrorMessage(true,{functionErrorName: "DESTROY TRANSACTION", totalErrParams: err, basefilename: "transaction", basedirname: "models"})
    }
  }

  static selectTransaction = async (condition = { id, category_id, user_id, compte_id }) => {
    try {
      if (condition.id == undefined && condition.category_id == undefined && condition.compte_id == undefined && condition.user_id == undefined) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Certaines informations obligatoires sont manquantes."
      })

      condition = suppNotUsed(condition)

      let select_info = await db("transaction").select("*").where(condition);

      if (select_info[0] == undefined) return CatchErrorMessage(false, {
        code: errorCode.NotFound,
        reason: "Transaction introuvable."
      })

      return {
          success: true,
          data: select_info,
      };
    } catch (err) {
      return CatchErrorMessage(true,{functionErrorName: "SELECT TRANSACTION", totalErrParams: err, basefilename:"transaction", basedirname: "models"})
    }
  }

  /* normalise la data */
  static modelNormilizer = async (params = {category_id, user_id, compte_id, montant, type, date, commentaire, toaccount}, obligatoire = false ) => {
    if (obligatoire == true && (!params.category_id || !params.user_id || !params.montant || !params.type || !params.date)) throw errorResponse({reason:"Certains paramètres obligatoire sont manquants."});

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

    if(params.toaccount){
      let isRealDone = await VerifTable("compte", params.compte_id);
      if(isRealDone.success == false) throw errorResponse({reason:"Compte de destination du transfère invalide"})
    }

    if(params.commentaire && (params.commentaire.length < 3 || params.commentaire.length > 145 )) throw errorResponse({reason:"Les commentaires doivent contenir plus de 3 caractère et moins de 140 caractère"})

    if(params.montant && (parseInt(params.montant) === NaN || params.montant <= 0)) throw errorResponse({reason:"Le montant doit être un nombre positif"})
    
    if(params.type && (parseInt(params.type) === NaN || params.type > 4 || params.type <= 0)) return errorResponse({reason:"Le type n'est pas valide"})

    if(params.date && !(params.date instanceof Date && !isNaN(params.date))) throw errorResponse({reason:"La date est invalide"})

    return suppNotUsed(params);
  };
};