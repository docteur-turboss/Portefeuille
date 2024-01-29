import { errorCode } from "./error.models.js";

export let ReturnMessageCUP = (id, comm) => {
    return {
        success : true,
        data : {
            id: id,
            commentaire : comm
        }
    }
}

export let CatchLogMessageController = (totalErrParams, basefilename, basedirname) =>{
    console.log("(backend/" + basedirname + "/"+ basefilename + ".controller.js) HAS ERROR :");
    console.log(totalErrParams);
}



export let CatchErrorMessage = (errorUnkown=false, args={functionErrorName, code:errorCode.UnknownError, reason:"", totalErrParams, basefilename, basedirname}) =>{
    let base = {success:false , code: errorCode.UnknownError}
    let params = {...base, ...args}
    /* Si une fonction a une erreur unconnu alors elle aura pour parametre errorUnknow la valeur true ce qui notiferas la dev */
    if(errorUnkown === true){
        console.log(params.functionErrorName + "(backend/" + params.basedirname + "/"+ params.basefilename + ".models.js) HAS ERROR :");
        console.log(params.totalErrParams);
    }

    return  {
        success: false,
        code: params.code,
        reason: params.reason
    }
}

export let errorResponse = (args={reason}) => {
    let base = {success:false ,code: errorCode.NotAcceptable}
    let params = {...base, ...args}
    return new Error("", {cause : {
        success: params.success,
        reason: params.reason,
        code: params.code,
    }})
}