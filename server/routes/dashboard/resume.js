const express = require("express")
const router = express.Router()
const createError = require("http-errors")
const findAll = require("../../utilities/findAll")
const { upload } = require("../../services/GFS")

// controllers
const doc_controller = require("../../controller/dashboard/resume/pdfs")
const work_xp_controller = require("../../controller/dashboard/resume/xps")
const { edu, certs } = require("../../controller/dashboard/resume/school")
const { skills, interests } = require("../../controller/dashboard/resume/skills")

// middle-wares
const { work_constraints, edu_constraints, certs_constraints, title_constraints } = require("../../middlewares/resume_constraints")

// models
const skill_model = require("../../models/resume/skills")
const int_model = require("../../models/resume/interests")
const certs_model = require("../../models/resume/certificates")
const edu_model = require("../../models/resume/edu")
const thesis_model = require("../../models/resume/thesis")
const work_xp_model = require("../../models/resume/work_xp")

// utility function
async function error_handler(request){
    
    if(typeof(request.cookies.state) === "object" && Object.keys(request.cookies).length !== 0){
        console.log("req.cookies: ", request.cookies)
        return await JSON.parse(request.cookies.state)
    } else {
        return request.cookies
    }
}

module.exports = () => {
    // @route: /dashboard/resume/skills 
    router.get("/", (req, res) => {
        res.status(301).redirect("/dashboard/resume/skills")
    })

    router.get("/skills", async (req, res, next) => { 
        try {
            const error = await error_handler(req)
            
            const skills = await findAll(skill_model)
    
            res.render("dashboard/resume", { skills, error })
            
    
        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
    })

    router.post("/skills", upload, title_constraints, skills)
    router.patch("/skills", upload, title_constraints, skills)
    // end of skills

    // @route: /dashboard/resume/certs
    router.get("/certs", async (req, res, next) => { 
        try {
            const error = error_handler(req)
            const certs = await findAll(certs_model)
            res.render("dashboard/cv-partials/certs", { certs, error })
            
    
        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
    })

    router.post("/certs", certs_constraints, certs)
    //end of certs

    // @route: /dashboard/resume/edu
    router.get("/edu", async (req, res, next) => { 
        try {
            const error = error_handler(req)
            const edu = await findAll([edu_model, thesis_model])
            res.render("dashboard/cv-partials/edu", { edu, error })
            
    
        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
    })

    router.post("/edu", edu_constraints, edu)
    // end of Edu

    // @route: /dashboard/resume/interests
    router.get("/interests", async (req, res, next) => { 
        try {
            const error = error_handler(req)
            const interests = await findAll(int_model)
            res.render("dashboard/cv-partials/ints", { interests, error })
            
    
        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
    })

    router.post("/interests", upload, title_constraints, interests)
    // end of interests

    // @route: /dashboard/resume/pdfs
    router.get("/pdfs", async (req, res, next) => { 
        try {
            const error = error_handler(req)
            const files = await findAll(docs_model)
            res.render("dashboard/cv-partials/pdfs", { files, error })
            
    
        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
    })

    router.post("/pdfs", upload, title_constraints, doc_controller)
    //end of pdfs

    // @route: /dashboard/resume/xps
    router.get("/xps", async (req, res, next) => { 
        try {
            const error = error_handler(req)
            const work_xps = await findAll(work_xp_model)
            res.render("dashboard/cv-partials/xps", { work_xps, error })
            
    
        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
    })

    router.post("/xps", work_constraints, work_xp_controller)

    return router
}