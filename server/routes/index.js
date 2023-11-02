const express = require("express")
const router = express.Router()
// const google = require("../../google4a04a9881bbe7856.html")
const path = require('path')

//error handler
const createError = require("http-errors")

//router functions
const blogRoute = require("./blog")
const contactRoute = require("./contact")
const resumeRoute = require("./resume")
const portfolioRoute = require("./portfolio")
const admin = require("./admin")
const dashboard = require("./dashboard")

//controller
const {image_controller} = require("../services/GFS")

//middlewares
const logged_in = require("../middlewares/logged_in")

//Services from app.js  
module.exports = ({aboutService, portfolioService, logService, dirname}) => {
    

    router.get("/", async (req, res, next) => {
        try {
            const aboutInfo = await aboutService.getAboutInfo()
            // const aboutInfo = { full_name, mail, dob, job, bio } = await debug.findOne
            res.render('about', { aboutInfo }) 
        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
        
    })

    router.get("/image/:file_name", image_controller)

    router.use("/blog", blogRoute())
    router.use("/resume", resumeRoute({aboutService}))
    router.use("/contact", contactRoute())
    router.use("/portfolio", portfolioRoute({portfolioService}))
    router.use("/adminxyz", admin({logService}))

    router.get("/fish", 
    function (req, res, next){
        console.log("fish test")
        return next()
    },

    function(req, res, next){
        res.status(200).json({body: "fish data", message: "success"})
    })

    router.get("/:google", (req, res, next) => {
        if(req.params.google === "google4a04a9881bbe7856.html"){
            res.status(200).sendFile(path.join(__dirname, "public", "/public/google4a04a9881bbe7856.html"))
        }
        next();
    })

    
    router.use("/dashboard", logged_in, dashboard())
    
    return router
}