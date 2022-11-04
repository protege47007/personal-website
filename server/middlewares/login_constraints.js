const { check } = require("express-validator")

const logInConstraints = [
    check("mail").trim().isEmail().normalizeEmail().withMessage("A valid email or password is required"),
    check("password").trim().isLength({min: 8}).escape().withMessage("A valid email or password is required")
]

module.exports = logInConstraints