const mongoose = require("mongoose")
const emailValidator = require("email-validator")
const bcrypt = require("bcrypt")

const profileSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        minlength: 3
    },
    mail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: {unique: true},
        validate: {
            validator: (e) => (emailValidator.validate(e)),
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        index: {unique: true},
        minlength: 6
    },
    profile_picture: {
        type: String,
    },
    location: {
        type: String,
        required: true,
        minlength: 3
    },
    dob: {
        type: String,
        required: true,
    },
    job: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true
    }
}, {timestamps: true});


profileSchema.pre("save", async function presave(next){
    const user = this

    if(!user.isModified("password")) return next()

    try {
        const hash = await bcrypt.hash(user.password, 10)
        user.password = hash
        return next()
    } catch (error) {
        return next(error)
    }
})

profileSchema.methods.comparePassword = async function comparePassword(userPassword){
    return bcrypt.compare(userPassword, this.password)
}


module.exports = mongoose.model("Client", profileSchema)