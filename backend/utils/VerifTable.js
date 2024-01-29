import db from '../config/db.js';

export default async (DBtable, id_params) => {
  let dbInfo = await db(DBtable).select("id").where({ id: id_params });

  dbInfo = await dbInfo[0];

  if (dbInfo == undefined) return {
      success : false,
      code : errorCode.NotFound
  }

  return {
    success : true
  }
}