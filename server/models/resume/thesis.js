const mongoose = require("mongoose")

const thesisSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }

}, {timestamps: true});


module.exports = mongoose.model("Thesis", thesisSchema)