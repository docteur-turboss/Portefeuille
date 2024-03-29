import {ReturnMessageCUP, CatchErrorMessage, errorResponse} from "./successResponse.models.js";
import suppNotUsed from "../utils/deleteParamsNotUsed.js";
import VerifTable from "../utils/VerifTable.js";
import { errorCode } from "./error.models.js";
import db from "../config/db.js";

export default class Objectif {
  static createObjectif = async (params = {compte_id, user_id, title, montant, date_cible, montant_touch}) => {
    try {
      let paramsObj = await Objectif.modelNormilizer(params, true);
      let result_Id = await db("objectif")
      .insert(paramsObj, ["id"]);
      
      return ReturnMessageCUP(result_Id[0], "Objectif crée");
    } catch (err) {
      if(err.cause === undefined){
        return CatchErrorMessage(true,{functionErrorName: "CREATE OBJECTIF", totalErrParams: err, basefilename: "objectif", basedirname: "models"});
      }else{
        return CatchErrorMessage(false, {code: err.cause.code, reason: err.cause.reason});
      }
    }
  };

  static updateObjectif = async (params = {title, montant, date_cible, montant_touch}, condition = { id }) => {
    try {
      if(Object.keys(params).length === 0) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Merci de donner au moins une valeur de modification.",
      })

      let paramsObj = await Objectif.modelNormilizer(params);
      let return_Id = await db("objectif")
        .update(paramsObj, ["id"])
        .where(condition);

      return ReturnMessageCUP(return_Id[0], "Objectif bien modifié.");
    } catch (err) {
      if(err.cause === undefined){
        return CatchErrorMessage(true,{functionErrorName: "UPDATE OBJECTIF", basefilename: "objectif", totalErrParams: err, basedirname: "models"});
      }else{
        return CatchErrorMessage(false, {code: err.cause.code, reason: err.cause.reason});
      }
    }
  }

  static destroyObjectif = async (condition = { id, compte_id, user_id }) => {
    try {
      if(Object.keys(condition).length === 0) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
        reason: "Certaines informations obligatoires sont manquantes.",
      })

      condition = suppNotUsed(condition)

      let select_info = await Objectif.selectObjectif(condition);
      if (select_info.success == false) return select_info;

      let return_Id = await db("objectif")
      .where(condition)
      .del(["id"]);

      return ReturnMessageCUP(return_Id[0], "Objectif bien détruit.")
    } catch (err) {
      return CatchErrorMessage(true,{functionErrorName: "DESTROY OBJECTIF", totalErrParams: err, basefilename: "objectif", basedirname: "models"})
    }
  }

  static selectObjectif = async (condition = { id, user_id, compte_id }) => {
    try {
      if(Object.keys(condition).length === 0) return CatchErrorMessage(false, {
        code: errorCode.NotAcceptable,
          reason: "Des paramètres obligatoires sont manquants."
        })

        condition = suppNotUsed(condition)

        let select_info = await db("objectif").select("*").where(condition);

        if (select_info[0] == undefined) return CatchErrorMessage(false, {
          code: errorCode.NotFound,
          reason: "Objectif introuvable."
        })

        return {
            success: true,
            data: select_info,
        };
    } catch (err) {
      return CatchErrorMessage(true,{functionErrorName: "SELECT OBJECTIF", totalErrParams: err, basefilename:"objectif", basedirname: "models"})
    }
  }

  /* normalise la data */
  static modelNormilizer = async ( params = {compte_id, user_id, title, montant, date_cible, montant_touch}, obligatoire = false ) => {
    if (obligatoire == true && (!params.compte_id || !params.montant || !params.title || !params.date_cible || params.montant_touch == undefined || !params.user_id)) throw errorResponse({reason:"Certains paramètres obligatoire sont manquants."});

    if(params.compte_id && isNaN(parseInt(params.compte_id))){
      throw errorResponse({reason : "L'identifiant de compte doit être un nombre"})
    }else if(params.compte_id){
      let isRealCompte = await VerifTable("compte", params.compte_id)
      if(isRealCompte.success == false) throw errorResponse({reason:"Compte invalide"})
    }

    if(params.user_id && isNaN(parseInt(params.user_id))){
      throw errorResponse({reason : "L'identifiant d'utilisateur doit être un nombre"})
    }else if(params.user_id) {
      let isRealUser = await VerifTable("user", params.user_id)
      if(isRealUser.success == false) throw errorResponse({reason:"Utilisateur invalide"})
    }

    if(params.title && (params.title.length < 3 || params.title.length > 40)) throw errorResponse({reason:"Le titre doit contenir plus de 3 caractère et moins de 40 caractère"})

    if(params.montant && (isNaN((params.montant)) || params.montant <= 0)) throw errorResponse({reason:"Le montant doit être un nombre positif"})

    if(params.montant_touch !== undefined && (params.montant_touch !== true && params.montant_touch !== false)) throw errorResponse({reason:"La valeur d'utilisation des réserves du comptes sont invalides"}) 
    if(params.montant_touch !== undefined && params.montant_touch === true) params.montant_touch = 1
    if(params.montant_touch !== undefined && params.montant_touch === false) params.montant_touch = 0

    if(params.date_cible && (isNaN(Date.parse(params.date_cible)) && Date.parse(params.date_cible) < Date.now())) throw errorResponse({reason:"La date cible est invalide"})
    if(params.date_cible) params.date_cible = new Date(params.date_cible).toISOString().slice(0, 19).replace('T', ' ');
    
    return suppNotUsed(params);
  };
};