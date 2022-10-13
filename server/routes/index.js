const express = require("express")
const router = express.Router()
const blogRoute = require("./blog")
const contactRoute = require("./contact")
const resumeRoute = require("./resume")
const portfolioRoute = require("./portfolio")
const admin = require("./admin")

// aboutServices is coming from params obj passed to the routes 
module.exports = ({aboutService, portfolioService}) => {
    

    router.get("/", async (req, res, next) => {
        try {
            const aboutInfo = await aboutService.getAboutInfo()
            
            res.render('about', { aboutInfo }) 
        } catch (error) {
            return next(error)
        }
        
    })
    router.use("/blog", blogRoute())
    router.use("/resume", resumeRoute(aboutService))
    router.use("/contact", contactRoute())
    router.use("/portfolio", portfolioRoute(portfolioService))
    router.use("/adminxyz", admin)
    
    return router
}