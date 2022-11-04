const express = require("express")
const { validationResult } = require("express-validator")
const router = express.Router()
const createError = require("http-errors")
const { send_contact_mail } = require("../utilities/sendMail")

// sanitizing our form inputs from injection attacks and ensuring we have data to operate with
const validationConstraints = require("../middlewares/validation-constraints")

module.exports = () => {
    // GET
    router.get("/", (req, res) => {
        // const errors = req.session.contact? req.session.contact.errors : false
        // const successMsg = req.session.contact? req.session.contact.message : false
        // req.session.contact = {}

        
        res.render('contact', {
            // errors,
            // successMsg
        })
    })


    //POST
    router.post("/", validationConstraints ,async (req, res, next) => {
        try {
            const errors = validationResult(req) //this checks for errors from the constraints
        
            if(!errors.isEmpty()) return next(createError(404, {status: '404', message: 'incomplete/incorrect credentials', body: errors.array()}))
            
            const {name, mail, subject, message} = req.body;

            const done = await send_contact_mail(name, mail, subject, message)
            if(done){
                res.status(200).json({status: '200', message: 'success'})
            }

        } catch (error) {
            return next(error)
        }
    })

    return router

}