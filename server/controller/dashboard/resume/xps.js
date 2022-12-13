// work xp handler
const createError = require("http-errors")

module.exports = async function(req, res, next){
    try {
        
    } catch (error) {
        return next(createError(500, { body: error, message: "internal server error" }))
    }
}