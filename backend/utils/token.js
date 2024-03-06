import { ErrorException } from '../models/error.models.js';

export default (validAuth = {token, cookieSecure, id}, res, next) => {
    try{
        /* options for cookie */
        const options = {
            signed: true,
            httpOnly: true,
            secure: true,
            sameSite: true
        };

        /* on crée le cookie du confirm */
        res.cookie('auth', validAuth.cookieSecure, options)
        res.status(200).json({
            success : true, 
            data : {
                id : validAuth.id,
                token : validAuth.token
            }
        })
    }catch(err){ 
        next(new ErrorException(
            CatchErrorMessage(true,{functionErrorName: "TOKEN", totalErrParams: err, basefilename:"token", basedirname: "utils"})
        ))
    }
};