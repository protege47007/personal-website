const express = require("express")
const router = express.Router()
const createError = require("http-errors")
const resume_controller = require("../../controller/dashboard/resume")
const findAll = require("../../utilities/findAll")

module.exports = () => {
    router.get("/", (req, res) => {
        res.status(301).redirect("/dashboard/resume/skills")
    })

    router.get("/skills", async (req, res, next) => { 
        try {
            
            res.render("dashboard/resume", { skills })
            
    
        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
    })

    router.get("/certs", async (req, res, next) => { 
        try {
            
            res.render("dashboard/cv-partials/certs", {})
            
    
        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
    })

    router.get("/edu", async (req, res, next) => { 
        try {
            
            res.render("dashboard/cv-partials/edu", {})
            
    
        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
    })

    router.get("/interests", async (req, res, next) => { 
        try {
            
            res.render("dashboard/cv-partials/ints", {})
            
    
        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
    })

    router.get("/pdfs", async (req, res, next) => { 
        try {
            
            res.render("dashboard/cv-partials/pdfs", {})
            
    
        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
    })

    router.get("/xps", async (req, res, next) => { 
        try {
            
            res.render("dashboard/cv-partials/xps", {})
            
    
        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
    })

    return router
}