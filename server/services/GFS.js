const config = require("../config")[process.env.NODE_ENV]
const util = require("util")
const multer = require("multer")
const { GridFsStorage } = require("multer-gridfs-storage")
const createError = require("http-errors")




const storage = new GridFsStorage({
    url: config.db.url,
    file: (req, file) => {
        const match = [ "image/png", "image/jpeg"]

        if( match.indexOf(file.mimetype) !== -1) return ({ bucketName: "photos", file_name: `${Date.now()}_${file.originalname}`})

        return createError(403, {message: "file is not an image"})
    }
})

const result = multer({ storage }).single("file")

module.exports = util.promisify(result)