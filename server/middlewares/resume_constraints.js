const { check } = require("express-validator")

const work_constraints = [
    
]

const edu_constraints = []

const certs_constraints = []

// document, skills, and interests
const title_constraints = [
    check("skill_name").trim().isLength({min: 2}).escape().withMessage("skill name is unsatisfactory"),
    check("image_alt").trim().isLength({min: 5}).escape().withMessage("image alt is unsatisfactory")
]

module.exports = { work_constraints, edu_constraints, certs_constraints, title_constraints }