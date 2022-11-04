const express = require("express")
const router = express.Router()
const resumeRoute = require("./resume")
const portfolioRoute = require("./portfolio")


// aboutServices is coming from params obj passed to the routes 
module.exports = ({aboutService, portfolioService}) => {
    

    router.get("/", async (req, res, next) => {
        try {
            const aboutInfo = await aboutService.getAboutInfo()
            
            res.render('dashboard/profile', { aboutInfo }) 
        } catch (error) {
            return next(error)
        }
        
    })

    router.post("/", async (req, res, next) => { //add validation middle wares
        try {
            const { full_name, dob, location, job } = req.body
            

        } catch (error) {
            return next(error)
        }
    } )
    router.use("/resume", resumeRoute({aboutService}))
    router.use("/portfolio", portfolioRoute({portfolioService}))
    
    return router
}