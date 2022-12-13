const mongoose = require("mongoose")
const Grid = require("gridfs-stream")
Grid.mongo = mongoose.mongo
const createError = require("http-errors")
const { promiseImpl } = require("ejs")
// const { GridFsBucket } = require("multer-gridfs-storage")


// const db_connection = mongoose.connection

// let gfs
// db_connection.once("open", ()=>{
//   gfs = Grid(db_connection.db)
//   gfs.collection = "photos"
// })

module.exports = async function(req, res, next){
    try {
        // mongoose.connection.db.listCollection("photos.file", (err, collection) => {
        //     if(err) throw createError(500, {message: "db error", body: err})
            // const gfs = Grid("GeneralDb", mongoose.connection)
            // gfs.files
            await mongoose.connection.db.getCollection("photo.files").find({}).toArray( (err, file) => { //{filename: req.params.file_name}
                if(err) throw createError(500, {body: err, message: "internal server error: db"})
                res.json(file)

                // if(!file) throw createError(404, {message: "file not found"})
    
                // if(["image/png", "image/jpeg"].indexOf(file.contentType) === -1 ) throw createError(403, { message: "file is not an image", body: file})
    
                // const read_stream = gfs.createReadStream(file.file_name)
    
                // read_stream.pipe(res)
            })
        // })
        
        
    } catch (error) {
        return next(createError(500, {body: error, message: "internal server error "}))
    }
}
