const createError = require("http-errors")

module.exports = async function(model_name){
    try {
         
        if(Array.isArray(model_name)){
            const result ={}

            model_name.forEach( async (model) => {
                const data = await model.find({})
                result[model] = data
            })

            if(!result) throw createError(502, {message: "no result found"})
            return result

        } else{
            const result = await model_name.find({})

            if(!result) throw createError(502, {message: "no result found"})
            return result
        }
        
         

    } catch (error) {
        return next(createError(500, {body: error, message: "internal server error"}))
    }
}