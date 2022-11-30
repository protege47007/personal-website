const express = require("express")
const router = express.Router()
const createError = require("http-errors")
const blogRoute = require("./blog")
const contactRoute = require("./contact")
const resumeRoute = require("./resume")
const portfolioRoute = require("./portfolio")
const admin = require("./admin")
const dashboard = require("./dashboard")

//middlewares
const logged_in = require("../middlewares/logged_in")

// aboutServices is coming from params obj passed to the routes 
module.exports = ({aboutService, portfolioService, logService}) => {
    

    router.get("/", async (req, res, next) => {
        try {
            const aboutInfo = await aboutService.getAboutInfo()
            // const aboutInfo = { full_name, mail, dob, job, bio } = await debug.findOne
            res.render('about', { aboutInfo }) 
        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
        
    })
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
    router.use("/dashboard", logged_in, dashboard())
    
    return router
}