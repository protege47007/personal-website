const express = require("express")
const router = express.Router()
const createError = require("http-errors")
const about_controller = require("../../controller/dashboard/about")
const About_Model = require("../../models/about")
const Portfolio_Model = require("../../models/portfolio")
const findAll = require("../../utilities/findAll")


// aboutServices is coming from params obj passed to the routes 
module.exports = () => {
    

    router.get("/", async (req, res, next) => {
        try {
            
            const result = await findAll(About_Model)
            const { full_name, mail, job, dob, location, bio } = result[0]
            const aboutInfo = { full_name, mail, job, dob, location, bio }
            res.render('dashboard/profile', { 
                aboutInfo
             })

        } catch (error) {
            console.log(error)
            return next(createError(500, {body: error, message: "internal server error"}))
        }
        
    })

    router.post("/", about_controller)

    router.get("/resume", async (req, res, next) => { //add validation middle wares
        try {
            const { full_name, dob, location, job } = req.body
            

        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
    } )
    router.get("/portfolio", async (req, res, next) => { //add validation middle wares
        try {
            const { full_name, dob, location, job } = req.body
            

        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
    } )
    
    return router
}