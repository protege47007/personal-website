const mongoose = require("mongoose")

const certSchema = new mongoose.Schema({
    course: {
        type:String,
        required: true
    },
    issued_by: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
    
    
}, {timestamps: true});


module.exports = mongoose.model("Certificates", certSchema)