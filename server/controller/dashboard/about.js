//error handler
const createError = require("http-errors")
const { validationResult } = require("express-validator")

//models
const About_Model = require("../../models/about")

//utility functions


module.exports = async function (req, res, next){
    console.log("got here")
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const data = await JSON.stringify({body: errors.array(), message: "Error: invalid inputs"})
            res.cookie("state", data, { maxAge: 3e4 })
            console.log("got here: error ", errors.array())
            return res.status(403).redirect("/dashboard/")
        }
        console.log("got here: no errors")
        const update = {
            full_name: req.body.full_name,
            job: req.body.job,
            location: req.body.location,
            bio: req.body.bio,
            dob: req.body.dob
        }
        console.log("file metadata: ", req.file, "\n body: ", req.body)
        if(req.file){
            console.log("profile pic: ", req.file.filename)
            update["profile_pic"] = req.file.filename
        }
        
        const result = await About_Model.findOneAndUpdate({ mail: process.env.MAIL }, update, { new: true })

        if(result){
            res.redirect("/dashboard/")
        }
        
    } catch (error) {
        return next(createError(500, {body: error, message: "internal server error"}))
    }
}






// router.get("/avatar/:filename", (req, res) => {
//     res.type("png"||"jpg")
//     return res.sendFile(avatars.filepath(req.params.filename))
// })

// router.get("/avatartn/:filename", async (req, res) =>{
//     res.type("png")
//     const tn = await avatars.thumbnail(req.params.filename)
//     return res.end(tn, "binary")
// })