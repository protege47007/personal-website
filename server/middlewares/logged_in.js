const createError = require("http-errors")
const jwt = require("jsonwebtoken")
const { session } = require("../config")[process.env.NODE_ENV || "development"]


module.exports = (req, res, next) => {
    try{
        // !req.headers.authorization ||
        if( !req.signedCookie) return next (createError(403, "Please supply an authorization header"))

        const enc_token = req.signedCookie

        if (!enc_token || typeof enc_token == "undefined") {
            return next(createError(401, "No authorization token supplied"))
        } else if (enc_token) {
            
            jwt.verify(enc_token, session.key, (err, dec_token) => {
                
                if(err) return next(createError(401, "Your session has expired. please login again"))
                if (dec_token) {
                    //renew token logic needed
                  if(dec_token.account_type!=='Admin')return next(createError(401, "You do not have the required credential to perform this operation"))
                 req.admin = { userId: dec_token.userId, mail: dec_token.mail, full_name: dec_token.full_name }
                 
                next();
              } else {
                return next(createError(401, "Missing required authentication"))
              }
            });
        }

    }catch(error){
        return next(createError(500, "Internal Server Error"))
    }
}