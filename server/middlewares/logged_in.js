const createError = require("http-errors")
const jwt = require("jsonwebtoken")
const { session } = require("../config")[process.env.NODE_ENV || "development"] 


module.exports = async (req, res, next) => {
    try{
        
        if( !req.signedCookies["cart"]) {
            res.cookie("state", "auth-404")
            res.status(403).redirect("/adminxyz/login")
        }

        const enc_token = req.signedCookies["cart"]

        if (!enc_token || typeof enc_token == "undefined") {
            res.cookie("state", "auth-404")
            res.status(403).redirect("/adminxyz/login")
        }
        
            
        jwt.verify(enc_token, session.key, (err, dec_token) => {
                
            if(err) {
                res.cookie("state", "auth-404")
                res.status(403).redirect("/adminxyz/login")
            }
                
            if (!dec_token) {
                res.cookie("state", "auth-404")
                res.status(403).redirect("/adminxyz/login")
            }
            
            //renew token logic needed
            if(dec_token.account_type!=='Admin') return next(createError(401, "You do not have the required credential to perform this operation"))
                
            req.admin = { userId: dec_token.userId, mail: dec_token.mail, full_name: dec_token.full_name }
            // console.log("moving to next function")
                
            
        })
        return next()


    }catch(error){
        console.log("middleware", error)
        return next(createError(500, "Internal Server Error"))
    }
}