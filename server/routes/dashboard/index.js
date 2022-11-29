const express = require("express")
const router = express.Router()
const about_controller = require("../../controller/dashboard/about")
const About_Model = require("../../models/about")
const Portfolio_Model = require("../../models/portfolio")


// aboutServices is coming from params obj passed to the routes 
module.exports = ({}) => {
    

    router.get("/", async (req, res, next) => {
        try {
            const aboutInfo = await aboutService.getAboutInfo()
            
            
            res.render('dashboard/profile', { aboutInfo }) 
        } catch (error) {
            return next(error)
        }
        
    })

    router.post("/", about_controller)

    router.get("/resume", async (req, res, next) => { //add validation middle wares
        try {
            const { full_name, dob, location, job } = req.body
            

        } catch (error) {
            return next(error)
        }
    } )
    router.get("/portfolio", async (req, res, next) => { //add validation middle wares
        try {
            const { full_name, dob, location, job } = req.body
            

        } catch (error) {
            return next(error)
        }
    } )
    
    return router
}