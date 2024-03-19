let db = require("../../config/db.js");

module.exports = class User {
  static update = async (params={cookie, token, id}, condition={id_bot}) => {
    try{
        await db("identifiant")
        .update(params)
        .where(condition);

        return 200
    }catch(err){
        console.log(err)
        return 400
    }
  }
  
  static create = async (params = {id_bot, id, cookie, token}) => {
    try{
        await db("identifiant")
        .insert(params);

        return 200
    }catch(err){
        console.log(err)
        return 400
    }
  }

  static read = async (condition = {id, id_bot}) => {
    try{
        let select_info = await db("identifiant").select("*").where(condition)
        if (select_info[0] == undefined) return 400

        return select_info[0]
    }catch(err){
        console.log(err)
        return 400
    }
  }

  static delete = async (condition = {id, id_bot}) => {
    try{
        await db("identifiant")
        .where(condition)
        .del();

        return 200
    }catch(err){
        console.log(err)
        return 400
    }
  }
};