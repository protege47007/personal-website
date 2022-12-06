const mongoose = require("mongoose")
const createError = require("http-errors")

module.exports = async function (collection_name, query_string, all, cb) {
    try{
        mongoose.connection.db.collection(`${collection_name}.files`, function (err, collection) {
            if(err) throw createError(500, {body: err, message: "db error"})
            
            if(all){
                collection.find({}).toArray( (err, files) => {
                    if(err) throw createError(500, {body: err, message: "db error: couldn't convert to array"})
                    if(!files || files.length === 0) throw createError(404, {message: "files not found!"})

                    return files
                })
            } else {
                collection.findOne({file_name: query_string}, (err, file) => {
                    if(err) throw createError(500, {body: err, message: "db error: couldn't fetch file"})
                    if(!file) throw createError(404, {message: "file not found!"})

                    return file
                })
            }
            const query = all ? {} :  
            collection.find(query).toArray(cb);
        })

    }catch(error){
        return createError(500, {body: error, message: "internal server error"})
    }
}