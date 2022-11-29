const mongoose = require("mongoose")

const skillSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    imageAlt: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
    
}, {timestamps: true});


module.exports = mongoose.model("Skill", skillSchema)