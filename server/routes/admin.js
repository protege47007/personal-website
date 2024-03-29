const express = require("express")
const router = express.Router()
const login_constraints = require("../middlewares/login_constraints")
const login_controller = require("../controller/auth/login")
const register = require("../controller/auth/register")
const Admin = require("../models/about")
const createError = require("http-errors")

//middlewares
const { redirectIfLoggedIn } = require("../middlewares/auth")


module.exports = () => {
    router.post("/login", redirectIfLoggedIn, login_constraints, login_controller)
    
    router.get("/login", redirectIfLoggedIn, (req, res) => {
        // attach errors
        const errors = false
        res.render("dashboard/login", { errors })
    })

    router.get("/logout", async (req, res, next) => {
        try {
            const { mail } = req.signedCookies["cart"]

            const done = await Admin.findOneAndUpdate({ mail }, { token: ""})
            if(done){ 
                
                res.cookie("value", "token", { signed: true })
                res.redirect("/")
            }

            return next(createError(500, {message: "could not log out successfully!"}))
            
        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        } 
    })

    router.post("/register", register)

    return router
}


