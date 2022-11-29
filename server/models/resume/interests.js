const mongoose = require("mongoose")

const interestSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    imageAlt: {
        type: String,
        required: true
    }

}, {timestamps: true});


module.exports = mongoose.model("Interest", interestSchema)