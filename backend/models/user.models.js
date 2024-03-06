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
      
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Activités pour enfants"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Alcool et bar"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Amusement"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Animaux de compagnie et animaux"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Arts"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Assurance automobile"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Assurance habitation"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Assurance santé"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Autres"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Bijoux"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Blanchisserie"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Câble ou DTH"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Cadeau"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Carburant et gaz"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Carte de crédit"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Charité"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Cheveux et Salon"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Date d'anniversaire"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Dentiste"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Dépenses diverses"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Des sports"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Docteur"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Eau"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Électricité"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Électronique et accessoires"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Entretien de la maison"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Entretien de la voiture"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Fast food"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Films et cinéma"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Frais de scolarité"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Frais scolaires"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Gaz"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Gym"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Hôtel"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Impôt fédéral"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Internet"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Investissement"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Jouets"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Journeaux et magazines"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Le restaurant"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Les cafés"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Livres et papeterie"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Location de maison"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Maison et ameublement"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Mariage"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Mobile"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Musiques"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Nourriture et Épicerie"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Pelouse et jardin"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Pharmacie"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Prêt"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Prêt de consomation"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Prêt de voitures"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Prêt immobilier"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Taxe de l'État"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Taxe de propriété"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Taxe de vente"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Taxe locale"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Taxi"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Téléphone"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Transfert"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Transport public"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Santé et beauté"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Se réunir"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Soin enfants"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Soin des animaux"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Soins de vieillesse"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Spa et massage"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Vêtement"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Voiture de location et taxi"})
      Category.createCategory({user_id: result_Id[0], type: 0, name: "Voyage en avion"})

      Category.createCategory({user_id: result_Id[0], type: 1, name: "Affaires & Profession"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Autres"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Cadeaux"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Coupons"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Courtage"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Crédit"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Des économies"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Intérêts"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Investissement"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Investissement"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Loterie, jeu"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Prime"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Prêt"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Remboursement"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Remboursement"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Revenus locatifs"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Salaire"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Salaires et conseils"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Transfert"})
      Category.createCategory({user_id: result_Id[0], type: 1, name: "Vendre un revenu"})

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
      if(Object.keys(params).length === 0) return CatchErrorMessage(false, {
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