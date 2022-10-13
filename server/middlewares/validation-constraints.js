const {body, validationResult} = require("express-validator")

module.exports = [
    body("name").trim().isLength({min: 5}).escape().withMessage("A name is required"),
    body("email").trim().isEmail().normalizeEmail().withMessage("A valid email is required"),
    body("title").trim().isLength({min: 5}).escape().withMessage("A title is required"),
    body("message").trim().isLength({min: 5}).escape().withMessage("A message is required"),
]