const {body, validationResult} = require("express-validator")

module.exports = [
    body("name").trim().isLength({min: 5}).escape().withMessage("A name is required"),
    body("mail").trim().isEmail().normalizeEmail().withMessage("A valid email is required"),
    body("subject").trim().isLength({min: 5}).escape().withMessage("A title is required"),
    body("messag").trim().isLength({min: 5}).escape().withMessage("A message is required"),
]