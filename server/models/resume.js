const mongoose = require(mongoose)

const resumeSchema = new mongoose.Schema({
    skills: [
        {
            imageUrl: String,
            imageAlt: String,
            title: String
        }
    ],
    workExp: [
        {
            position: String,
            company: String,
            date: String,
            responsibilities: [String]
        }
        
    ],
    projects: [
        {
            name: String,
            description: String,
            responsibilities: [String]
        }
    ],
    edu: [
        {
            degree: String,
            school: String,
            date: String
        }
    ],
    Thesis: [
        {
            title: String,
            desc: String
        }
    ],
    Certificates: [
        {
            course: String,
            issued_by: String,
            date: String
        }
    ],
    interests: [
        {
            imageUrl: String,
            title: String,
            imageAlt: String
        }
    ],
}, {timestamps: true});


module.exports = mongoose.model(Client, resumeSchema)