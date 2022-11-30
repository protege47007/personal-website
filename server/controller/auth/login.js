const Admin = require("../../models/about")
const createError = require("http-errors")
const { session } = require("../../config")[process.env.NODE_ENV || "development"]
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const { json } = require("body-parser")


module.exports = async (req, res, next) => {
    try {
        
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const data = await JSON.stringify({body: errors.array(), message: "Forbidden: Invalid Credentials"})
            res.cookie("state", data, { maxAge: 3e4 })
            
            return res.status(403).redirect("/adminxyz/login")
        }
            
            const { mail, password } = req.body
            
            Admin.findOne({ mail }, async (err, foundAdmin) => {
                if (err) return next(createError(500, {body: err, message: "Internal Server Error"}))
               
                if(!foundAdmin) return next(createError(403, "Invalid Credentials"))
                
                const logged_in_admin = await foundAdmin.comparePassword(password)

                if(!logged_in_admin) return next(createError(403, "Invalid Credentials"))
                //complete the login process
                
                jwt.sign({
                    userId: foundAdmin._id, 
                    mail: foundAdmin.mail, 
                    full_name: foundAdmin.full_name,
                    account_type: "Admin"
                }, 
                session.key, { expiresIn: "60m"}, async (err, token) => {
                    if(err) return next(createError(500, {body: err, message: "Internal Server Error"}))
                    foundAdmin.token = token
                    const ok = await foundAdmin.save()
                    if(!ok) return next(createError(500, {messgae: "internal server error"}))
                    
                    
                    res.cookie("cart", token, { signed: true, maxAge: Date.now() + 3.6e6 })
                    
                    res.status(301).redirect("/dashboard")
                })
                
            })

    } catch (error) {
        // console.log("error:", error)
        return next(createError("500", { body: error, message: "internal server error"}))
    }
}