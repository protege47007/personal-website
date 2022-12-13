const config = require("../config")[process.env.NODE_ENV]
const util = require("util")
const mongoose = require("mongoose")
const multer = require("multer")
const Grid = require("gridfs-stream")
Grid.mongo = mongoose.mongo
const { GridFsStorage } = require("multer-gridfs-storage")
const createError = require("http-errors")


const db_connection = mongoose.connection

let gfs, GFsB
db_connection.once("open", ()=>{
    GFsB = new mongoose.mongo.GridFSBucket(db_connection.db, { bucketName: "photos"})
    gfs = Grid(db_connection.db)
  gfs.collection("photos") 
})

const storage = new GridFsStorage({
    url: config.db.url,
    file: (req, file) => {
        const match = [ "image/png", "image/jpeg"]

        if( match.indexOf(file.mimetype) !== -1) return ({ bucketName: "photos", filename: `${Date.now()}_${file.originalname}`})

        return createError(403, {message: "file is not an image"})
    }
})

const result = multer({ storage }).single("file")
const upload = util.promisify(result)

async function image_controller(req, res, next){
    try {

            gfs.files.findOne({filename: req.params.file_name}, (err, file) => {
                if(err) throw createError(500, {body: err, message: "internal server error: db"})
    
                if(!file) throw createError(404, { message: "file not found" })
    
                if(["image/png", "image/jpeg"].indexOf(file.contentType) === -1 ) throw createError(403, { message: "file is not an image"})
                
                // console.log("this is the file:", file)
                const read_stream = GFsB.openDownloadStream(file._id)
    
                read_stream.pipe(res)
                read_stream.on("error", function (err) {
                    return createError(404,{ message: "Cannot download the Image!", body: err});
                })
                read_stream.on("end", () => {
                    return res.end();
                })
            
            })
        // })
        
    } catch (error) {
        return next(createError(500, {body: error, message: "internal server error "}))
    }
}

module.exports = { upload, image_controller}