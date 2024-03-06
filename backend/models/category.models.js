import {ReturnMessageCUP, CatchErrorMessage, errorResponse} from "./successResponse.models.js";
import suppNotUsed from "../utils/deleteParamsNotUsed.js";
import Transaction from "./transaction.models.js";
import VerifTable from "../utils/VerifTable.js";
import { errorCode } from "./error.models.js";
import Budget from "./budget.models.js";
import db from "../config/db.js";
import Facture from "./facture.models.js";

export default class Category {
  static createCategory = async (params = {user_id, name:"category", type}) => {
    try {
      let paramsObj = await Category.modelNormilizer(params, true);
      let result_Id = await db("category")
      .insert(paramsObj, ["id"]);

      return ReturnMessageCUP(result_Id[0], "Category créé")
    } catch (err) {
      if(err.cause === undefined){
        return CatchErrorMessage(true,{functionErrorName: "CREATE CATEGORY", totalErrParams: err, basefilename: "category", basedirname: "models"})
      }else{
        return CatchErrorMessage(false, {code: err.cause.code, reason: err.cause.reason})
      }
    }
  };

  static updateCategory = async (params = {name:undefined, type}, condition = { id }) => {
    try {
      if(Object.keys(params).length === 0) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Merci de donner au moins une valeur de modification.",
      })

      let paramsObj = await Category.modelNormilizer(params);
      let return_Id = await db("category")
        .update(paramsObj, ["id"])
        .where(condition);

      return ReturnMessageCUP(return_Id[0], "Category bien modifié.")
    } catch (err) {
      if(err.cause === undefined){
        return CatchErrorMessage(true,{functionErrorName: "UPDATE CATEGORY", totalErrParams: err, basefilename:"category", basedirname: "models"})
      }else{
        return CatchErrorMessage(false, {code: err.cause.code, reason: err.cause.reason})
      }
    }
  }

  static destroyCategory = async (condition = { id, user_id }) => {
    try {
      if(Object.keys(condition).length === 0) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Certaines informations obligatoires sont manquantes.",
      })

      condition = suppNotUsed(condition)

      let select_info = await Category.selectCategory(condition);
      if (select_info.success == false) return select_info;

      await Budget.destroyBudget({category_id : select_info.data[0].id})
      await Transaction.destroyTransaction({category_id : select_info.data[0].id})
      await Facture.destroyFacture({category_id : select_info.data[0].id})

      let return_Id = await db("category")
      .where(condition)
      .del(["id"]);

      return ReturnMessageCUP(return_Id[0], "Category bien détruit.")
    } catch (err) {
      return CatchErrorMessage(true,{functionErrorName: "DESTROY CATEGORY", totalErrParams: err, basefilename:"category", basedirname: "models"})
    }
  }

  static selectCategory = async (condition = { id, user_id }) => {
    try {
      if(Object.keys(condition).length === 0) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Des paramètres obligatoires sont manquants."
      })

      condition = suppNotUsed(condition)

      let select_info = await db("category").select("*").where(condition);

      if (select_info[0] == undefined) return CatchErrorMessage(false, {
        code: errorCode.NotFound,
        reason: "Category introuvable."
      })

      return {
        success: true,
        data: select_info
      };
    } catch (err) {
      return CatchErrorMessage(true,{functionErrorName: "SELECT CATEGORY", totalErrParams: err, basefilename:"category", basedirname: "models"})
    }
  }

  /* normalise la data */
  static modelNormilizer = async ( params = {user_id, name:"category", type}, obligatoire = false ) => {
    if (obligatoire == true && (!params.name || !params.user_id || !params.type)) throw errorResponse({reason:"Certains paramètres obligatoire sont manquants."});

    if(params.user_id){
      let isRealUser = await VerifTable("user", params.user_id)
      if(isRealUser.success == false) throw errorResponse({reason:"Utilisateur invalide"})
    }

    if(params.name && (params.name.length >= 40 || params.name.length < 3)) throw errorResponse({reason:"Le nom ne doit pas posséder plus de 40 caractère et au minimum 4"})

    if(params.type && isNaN((parseInt(params.type)) || params.type > 4 || params.type <= 0)) throw errorResponse({reason:"Le type n'est pas valide"})

    return suppNotUsed(params);
  };
};