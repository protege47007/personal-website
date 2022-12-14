const express = require("express")
const router = express.Router()
const createError = require("http-errors")

//controllers
const about_controller = require("../../controller/dashboard/about")
const portfolio_controller = require("../../controller/dashboard/portfolio")

//router function
const resume_router = require("./resume")

//models
const About_Model = require("../../models/about")
const Portfolio_Model = require("../../models/portfolio")

//utility functions and services
const findAll = require("../../utilities/findAll")
const { upload } = require("../../services/GFS")

//middlewares
const profile_constraints = require("../../middlewares/profile_constraints")


// aboutServices is coming from params obj passed to the routes 
module.exports = () => {
    

    router.get("/", async (req, res, next) => {
        try {
            const error ={}
            if(req.cookies.state){
                error["body"] = req.cookies.state
                res.cookie("state", "", { maxAge: 3e1 })
            }

            const result = await findAll(About_Model)
            const { full_name, mail, job, dob, location, bio, profile_pic } = result[0]
            const aboutInfo = { full_name, mail, job, dob, location, bio, profile_pic }

            res.render('dashboard/profile', { 
                aboutInfo,
                error
             })

        } catch (error) {
            console.log(error)
            return next(createError(500, {body: error, message: "internal server error"}))
        }
        
    })

    router.post("/", upload, profile_constraints, about_controller)

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