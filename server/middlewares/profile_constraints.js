const { check } = require("express-validator")

const profile_constraints = [
    check("full_name").trim().isLength({min: 3}).escape().withMessage("full name is unsatisfactory"),
    check("bio").trim().isLength({min: 20}).escape().withMessage("bio is unsatisfactory"),
    check("location").trim().isLength({min: 3}).escape().withMessage("location is unsatisfactory"),
    check("job").trim().isLength({min: 3}).escape().withMessage("job is unsatisfactory")
]

module.exports = profile_constraints