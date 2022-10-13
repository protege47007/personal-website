const express = require("express")
const { validationResult } = require("express-validator")
const router = express.Router()
require('dotenv').config()
const createError = require("http-errors")
const mailJet = require ('node-mailjet').connect(`${process.env.JET_ONE}`, `${process.env.JET_TWO}`)

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
        
            if(!errors.isEmpty()){ // if there are errors from the req.body validation constraints
                req.session.contact = {
                    errors: errors.array() // returns an array of errors
                }

                return res.redirect("/contact")
            }

            const {name, mail, subject, message} = req.body;

            console.log(req.body);
            const request = mailJet.post("send", {'version': 'v3.1'})
            .request({
            "Messages":[
                {
                "From": {
                    "Email": "akdadewumi@gmail.com",
                    "Name": "David"
                },
                "To": [
                    {
                    "Email": "akdadewumi@gmail.com",
                    "Name": ""
                    }
                ],
                "Subject": `${subject}`,
                "TextPart": `Name: ${name}, mail: ${mail}, Message:  ${message}`,
                "HTMLPart": "<h3>Good Day Boss,</h3><br />"+
                `<p> Mr/Miss/Mrs ${name}, left you a message that says,</p> <br/>`+
                `<p style:"font-weight: 700;">${message}</p><br/>`+
                `<p>You can reach them at: <a href="mailto:${mail}">${mail}</a></p>`,
                "CustomID": "messageFromWebApp"
                }
            ]
            })
            request
            .then((result) => {
                res.json({status: '200', message: 'success'});
                console.log(result.body)
            })
            .catch((err) => {
                return next(createError({body: err, message: "contact message was not sent"}))
            })

        } catch (error) {
            return next(error)
        }
    })

    return router

}