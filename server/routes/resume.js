const express = require("express")
const router = express.Router()
const certificates = require("../models/resume/certificates")
const skills = require("../models/resume/skills")
const workExp = require("../models/resume/work_xp")
const edu = require("../models/resume/edu")
const thesis = require("../models/resume/thesis")
const interests = require("../models/resume/interests")
const createError = require("http-errors")
const findAll = require("../utilities/findAll")

module.exports = ({ aboutService }) => {
    router.get("/", async (req, res, next) => {
        try {
            const resume = await aboutService.getResume()
            // const resume = await findAll([certificates, skills, workExp, edu, thesis, interests])

            res.render('resume', {resume})

        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
    })

    return router
}