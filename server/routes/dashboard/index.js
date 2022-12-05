const express = require("express")
const router = express.Router()
const createError = require("http-errors")
const about_controller = require("../../controller/dashboard/about")
const resume_router = require("./resume")
const portfolio_controller = require("../../controller/dashboard/portfolio")
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
            
            const profile_pic = ""

            res.render('dashboard/profile', { 
                aboutInfo,
                profile_pic: false
             })

        } catch (error) {
            console.log(error)
            return next(createError(500, {body: error, message: "internal server error"}))
        }
        
    })

    router.post("/", about_controller)

    //resume dashboard route
    router.use("/resume", resume_router())

    //portfolio dashboard route
    router.get("/portfolio", async (req, res, next) => { //add validation middle wares
        try {
            const portfolio = await findAll(Portfolio_Model)

            res.render("dashboard/portfolio", portfolio)
            

        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
    })

    router.post("/portfolio", portfolio_controller)
    
    return router
}