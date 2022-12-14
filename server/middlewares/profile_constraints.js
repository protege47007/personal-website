const { check } = require("express-validator")

const profile_constraints = [
    check("full_name").trim().isLength({min: 3}).escape().withMessage("full name is unsatisfactory"),
    check("bio").trim().isLength({min: 20}).withMessage("bio is unsatisfactory").matches(/^[A-Za-z0-9 .,'!&]+$/),
    check("location").trim().isLength({min: 3}).escape().withMessage("location is unsatisfactory"),
    check("job").trim().isLength({min: 3}).escape().withMessage("job is unsatisfactory")
]

module.exports = profile_constraints