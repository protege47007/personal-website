const createError = require("http-errors")

module.exports = function (req, res, next){
    try {
        function find (name, query, cb) {
            mongoose.connection.db.collection(name, function (err, collection) {
               collection.find(query).toArray(cb);
           });
        }
    } catch (error) {
        return next(createError(500, {body: error, message: "internal server error"}))
    }
}