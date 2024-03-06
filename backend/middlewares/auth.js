import { ErrorException, errorCode } from '../models/error.models.js';
import Transaction from '../models/transaction.models.js';
import Objectif from '../models/objectif.models.js';
import Category from '../models/category.models.js';
import Facture from '../models/facture.models.js';
import Budget from '../models/budget.models.js';
import Compte from '../models/compte.models.js';
import User from '../models/user.models.js';

export let isAuthenticatedUser = async(req, res, next) =>{
  try{
    let {cookies, headers} = req;
    /* On vérifie les accès */
    if((!cookies || !cookies.secureCookie) && (!headers || !headers['token'])){
      return next(new ErrorException(errorCode.Unauthorized, "Certaines informations de sécurité sont manquantes"))
    }

    let confirmAuth = req.signedCookies.auth
    let AuthTok = headers['token']

    let id = Buffer.from(AuthTok.split('.')[0], 'base64url').toString('utf-8')

    let userInformation = await User.selectUser({id : id, del: false})
    if(userInformation.success === false || userInformation.data[0].token !== AuthTok || userInformation.data[0].cookieSecure !== confirmAuth){
      return next(new ErrorException(errorCode.Unauthorized, "L'utilisateur n'existe pas ou l'utilisateur n'est pas connecté."))
    }

    req.UserID = id
    return next()
  }catch(err){
    console.log("AUTH (backend/middlewares/auth) HAS ERROR :")
    // console.log(err)

    return next(new ErrorException())
  }
}

export let hasAuthorisation = async(req, res, next) =>{
  let params
  if((req.baseUrl+req.path).includes("budget")){
    params = await Budget.selectBudget({user_id : req.UserID}, )
  }else if((req.baseUrl+req.path).includes("category")){
    params = await Category.selectCategory({user_id : req.UserID})
  }else if((req.baseUrl + req.path).includes("compte")){
    params = await Compte.selectCompte({user_id : req.UserID})
  }else if((req.baseUrl + req.path).includes("facture")){
    params = await Facture.selectFacture({user_id : req.UserID})
  }else if((req.baseUrl + req.path).includes("objectif")){
    params = await Objectif.selectObjectif({user_id : req.UserID})
  }else if((req.baseUrl + req.path).includes("transaction")){
    params = await Transaction.selectTransaction({user_id : req.UserID})
  }else{
    console.log("HAS AUTHORISATION (backend/middlewares/auth) HAS ERROR :")
    console.log(err)

    return next(new ErrorException())
  }

  if(params.success == false){
    return next(new ErrorException(errorCode.NotFound, "Veuillez créer une instance avant de la demander"))
  }

  if(params.data[0]){
    return next()
  }

  return next(new ErrorException(errorCode.Forbidden))
}