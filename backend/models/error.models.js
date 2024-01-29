export const errorCode = {
    NotFound : "NotFound",
    UnknownError : "UnknownError",
    NotAcceptable : "NotAcceptableError",
    Forbidden : "Forbidden",
    BadRequest : "BadRequest",
    ToManyRequest : "ToManyRequest",
    Unauthorized : "Unauthorized"
}

export let ErrorException = class ErrorException extends Error{
    constructor(code = errorCode.UnknownError, reason = null){
        super(code);
        this.status = 500;
        this.reason = reason;
        switch(code){
            case errorCode.BadRequest : 
                this.title = "BAD REQUEST";
                this.status = 400;
                break;
            case errorCode.Forbidden :
                this.title = "FORBIDDEN";
                this.status = 403;
                break;
            case errorCode.NotFound :
                this.title = "NOT FOUND";
                this.status = 404;
                break;
            case errorCode.NotAcceptable :
                this.title = "NOT ACCEPTABLE";
                this.status = 406;
                break;
            case errorCode.ToManyRequest :
                this.title = "TO MANY REQUEST";
                this.status = 429;
                break;
            case errorCode.Unauthorized :
                this.title = "UNAUTHORIZED",
                this.status = 401;
                break;
            default :
                this.title = "INTERNAL SERVER ERROR";
                this.status = 500;
                break;
        }
    }
}