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
        if(!errors.isEmpty() ){
            const data = await JSON.stringify({body: errors.array(), message: "Error: input error"})
            res.cookie("state", data, { maxAge: 3e4 })
                    
            return res.status(403).redirect(`/dashboard${path}`)
        }

        if(req.method === "POST"){
            if( !req.file){
                const data = await JSON.stringify({ message: "Error: file not found or unsuccessfully uploaded"})
                res.cookie("state", data, { maxAge: 3e4 })
                    
                return res.status(403).redirect(`/dashboard${path}`)
            } 

            const new_file = model_name({
                imageUrl: req.file.filename,
                imageAlt: `${req.body.skill_name}'s icon`,
                title: req.body.skill_name 
            })
                
            const result = await new_file.save()

            if(result){
                res.redirect(`/dashboard${path}`)
            }
        }

        if(req.method.toString() === "PATCH"){
            const update = {
                imageAlt: `${req.body.skill_name}'s icon`,
                title: req.body.skill_name 
            }

            if(req.file){
                update["imageUrl"] = req.file.filename
            }

            const result = await model_name.findOneAndUpdate( { imageUrl: req.body.old_filename }, update, { new: true })
            
            
            if(result){
                res.redirect(`/dashboard${path}`)
            }
        }

        if(req.method === "DELETE"){
            const filter = req.body.old_filename
            const result = await model_name.deleteOne( {imageUrl: filter})
            if( result){
                res.redirect(`/dashboard${path}`)
            }

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