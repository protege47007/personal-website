// educations, and certificates handler
const createError = require("http-errors")

async function edu(req, res, next){
    try {
        
    } catch (error) {
        return next(createError(500, { body: error, message: "internal server error" }))
    }
}

async function certs(req, res, next){
    try {
        
    } catch (error) {
        return next(createError(500, { body: error, message: "internal server error" }))
    }
}

module.exports = { edu, certs }