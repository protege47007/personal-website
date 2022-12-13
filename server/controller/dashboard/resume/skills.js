// skills and interests handler
const createError = require("http-errors")
const { validationResult } = require("express-validator")

// models constructor
const skill_model = require("../../../models/resume/skills")
const int_model = require("../../../models/resume/interests")

//utility function
async function save_new(req, res, path, model_name){
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty() || !req.file){
            const data = await JSON.stringify({body: errors.array(), message: "Error: file not found or error while uploading"})
            res.cookie("state", data, { maxAge: 3e4 })
                
            return res.status(403).redirect(`/dashboard${path}`)
        }

        const new_file = model_name({
            imageUrl: req.file.filename,
            imageAlt: req.body.image_alt,
            title: req.body.skill_name 
        })
            
        const result = await new_file.save()

        if(result){
            res.redirect(`/dashboard${path}`)
        }

    }catch(error){
        return next(createError(500, { body: error, message: "internal server error"}))
    }
}


// request handler
async function skills(req, res, next){
    try {
        // create new skill
        await save_new(req, res, "/resume/skills", skill_model)

    } catch (error) {
        return next(createError(500, { body: error, message: "internal server error" }))
    }
}

async function interests(req, res, next){
    try {
        await save_new(req, res, "/resume/interests", int_model)

    } catch (error) {
        return next(createError(500, { body: error, message: "internal server error" }))
    }
}

module.exports = { skills, interests }