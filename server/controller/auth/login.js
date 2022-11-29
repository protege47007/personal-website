const Admin = require("../../models/about")
const createError = require("http-errors")
const { session } = require("../../config")[process.env.NODE_ENV || "development"]
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")


module.exports = async (req, res, next) => {
    try {
        
        const errors = validationResult(req)
            if(!errors.isEmpty()) return next(createError(403, {body: errors.array(), message: "Forbidden: Invalid Credentials"}))
            
            const { mail, password } = req.body
            
            Admin.findOne({ mail }, async (err, foundAdmin) => {
                if (err) return next(createError(500, {body: err, message: "Internal Server Error"}))
               
                if(!foundAdmin) return next(createError(403, "Invalid Credentials"))
                
                const logged_in_admin = await foundAdmin.comparePassword(password)

                if(!logged_in_admin) return next(createError(403, "Invalid Credentials"))
                //complete the login process
                
                jwt.sign({userId: foundAdmin._id, mail: foundAdmin.mail, full_name: foundAdmin.full_name}, session.key, { expiresIn: "60m"}, async (err, token) => {
                    if(err) return next(createError(500, {body: err, message: "Internal Server Error"}))
                    foundAdmin.token = token
                    const ok = await foundAdmin.save()
                    if(!ok) return next(createError(500, {messgae: "internal server error"}))
                    
                    req.signedCookie = token
                    console.log("done", req.signedCookie) //log
                    res.redirect("/dashboard/")
                })
                
            })

    } catch (error) {
        console.log("error:", error)
        return next(createError("500", { body: error, message: "internal server error"}))
    }
}