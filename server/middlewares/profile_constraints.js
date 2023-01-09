const { check } = require("express-validator")

const profile_constraints = [
    check("full_name").trim().isLength({min: 3}).escape().withMessage("full name is unsatisfactory"),
    check("bio").trim().isLength({min: 20}).withMessage("bio is unsatisfactory"),
    check("location").trim().isLength({min: 3}).escape().withMessage("location is unsatisfactory"),
    check("job").trim().isLength({min: 3}).escape().withMessage("job is unsatisfactory"),
    check("dob").trim().isLength({min: 3}).escape().withMessage("date of birth is unsatisfactory"),
    check("mail").trim().isEmail().normalizeEmail().withMessage("A valid email is required"),
]

module.exports = profile_constraints