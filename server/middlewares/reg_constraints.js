const { check } = require("express-validator")

const registrationConstraints = [
    check("full_name").trim().isLength({min: 3}).escape().withMessage("A full-name is required or full name is too short: min-length: 3"),
    check("mail").trim().isEmail().normalizeEmail().withMessage("A valid email is required"),
    check("password").trim().isLength({min: 8}).escape().withMessage("A password is required or password is too short: min-length: 8")
]

module.exports = registrationConstraints