const { check } = require("express-validator")

const work_constraints = [
    
]

const edu_constraints = []

const certs_constraints = []

// document, skills, and interests
const title_constraints = [
    check("skill_name").trim().isLength({min: 2}).withMessage("skill name is unsatisfactory")
]

module.exports = { work_constraints, edu_constraints, certs_constraints, title_constraints }