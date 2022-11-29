const mongoose = require("mongoose")

const workXpSchema = new mongoose.Schema({
    position: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    responsibilities: [String]
    
    
}, {timestamps: true});


module.exports = mongoose.model("work_exp", workXpSchema)