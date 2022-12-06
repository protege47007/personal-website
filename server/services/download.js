const mongoose = require("mongoose")
const { GridFsBucket } = require("multer-gridfs-storage")

module.exports = async function (collection_name, file_name ){
    const sm = new GridFsBucket({})
}