const mongoose = require("mongoose")

const portfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
        minlength: 3
    },
    imageUrl: {
        type: String,
        required: true,
    },
    imageAlt: {
        type: String,
        required: true,
        minlength: 3
    },
    url: {
        type: String,
        required: true,
    }
}, {timestamps: true})


module.exports = mongoose.model("Portfolio", portfolioSchema)