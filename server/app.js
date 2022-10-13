const express = require("express")
const path = require("path")
const createError = require("http-errors")//
const cookieSession = require("cookie-session")//
const cookieParser = require("cookie-parser")//
const session = require("express-session")//
const logger = require("morgan")//
const _ = require('lodash')
const ejs = require('ejs')
const routes = require("./routes")

//services
const AboutService = require("./services/aboutService")
const PortfolioService = require("./services/portfolioService")
const AuthService = require("./services/auth")


// require('dotenv').config()
// const mailjet = require ('node-mailjet').connect(`${process.env.JET_ONE}`, `${process.env.JET_TWO}`)




module.exports = (config) => {
  const app = express() 
  const aboutService = new AboutService(config.data.about)
  const portfolioService = new PortfolioService(config.data.about)

  
  // middlewares
  app.set("view engine", "ejs")
  app.set("views", path.join(__dirname, "./views"))
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(express.static(path.join(__dirname, "./public")))


  app.use("/", routes({aboutService, portfolioService}))

  // //home route
  // app.get('/', (req, res) => {
  //     res.render('about', {})
  // })

  // //resume route
  // app.get('/resume', (req, res)=> {
  //     res.render('resume')
  // })

  // //portfolio route
  // app.get('/portfolio', (req, res) => {
  //     res.render('portfolio')
  // })


  // //contact route
  // app.get('/contact', (req, res) =>{
  //     res.render('contact')
  // })

  // app.post('/contact', (req, res) => {
  //     const {name, mail, subject, message} = req.body

  //     console.log(req.body)
  //     const request = mailjet
  // .post("send", {'version': 'v3.1'})
  // .request({
  //   "Messages":[
  //     {
  //       "From": {
  //         "Email": "akdadewumi@gmail.com",
  //         "Name": "David"
  //       },
  //       "To": [
  //         {
  //           "Email": "akdadewumi@gmail.com",
  //           "Name": ""
  //         }
  //       ],
  //       "Subject": `${subject}`,
  //       "TextPart": `Name: ${name}, mail: ${mail}, Message:  ${message}`,
  //       "HTMLPart": "<h3>Good Day Boss,</h3><br />"+
  //       `<p> Mr/Miss/Mrs ${name}, left you a message that says,</p> <br/>`+
  //       `<p style:"font-weight: 700">${message}</p><br/>`+
  //       `<p>You can reach them at: <a href="mailto:${mail}">${mail}</a></p>`,
  //       "CustomID": "messageFromWebApp"
  //     }
  //   ]
  // })
  // request
  //   .then((result) => {
  //     res.json({status: '200', message: 'success'})
  //     console.log(result.body)
  //   })
  //   .catch((err) => {
  //       res.json({status: '500', message: 'internal server error', body: err})
  //     console.log(err.statusCode)
  //   })



  // })


  // catch 404 and forward to error handler
  app.use( (req, res, next) => {
    return next(createError(404, "File Not Found"))
  })
  
  // error handler
  app.use( (err, req, res, next) => {
    console.log(err)
    res.locals.message = err.message // global error message
    const status = err.status || 500
    res.locals.status = status // global error status
    res.status(500).json({body: err.body, message: err.message})
  })


  

  return app
}

