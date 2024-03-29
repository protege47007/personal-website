const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const _ = require('lodash')
const ejs = require('ejs')
const routes = require("./routes")
const cors = require("cors")
const method_override = require("method-override")

//services
const AboutService = require("./services/aboutService")
const PortfolioService = require("./services/portfolioService")
const AuthService = require("./services/auth")
const LogService = require("./services/logService")


module.exports = (config) => {
  const app = express() 
  const aboutService = new AboutService(config.data.about)
  const portfolioService = new PortfolioService(config.data.portfolio)
  const logService = new LogService(config.data.log)

  
  app.use(cors())
  app.use(method_override("_method"))
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-with,Content-Type,Accept,Authorization");
    next()
  })

  app.use(cookieParser(`${process.env.COOKIE_KEY}`))
  // app.use(
  //   session({
  //     secret: process.env.KEY_1,
  //     resave: true,
  //     saveUninitialized: false,
  //     store: new MongoStore({ mongooseConnection: mongoose.connection }),
  //   })
  // );
  // app.use(auth.initialize)
  // app.use(auth.session)
  // app.use(auth.setUser)

  // middlewares
  app.set("view engine", "ejs")
  app.set("views", path.join(__dirname, "./views"))
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(express.static(path.join(__dirname, "./public")))


  app.use("/", routes({aboutService, portfolioService, logService}))

  // catch 404 and forward to error handler
  app.use( (req, res, next) => {
    res.render("404")
  })
  
  // error handler
  app.use( async (err, req, res, next) => {
    const { body, ...rest } = err
    console.log("*****************************Error Body**********************************: \n", err,
    "\n****************Error Message*****************: \n", rest)
    res.locals.message = rest // global error message
    const status = err.status || 500
    res.locals.status = status // global error status
    // await logservice.saveLogData({name: "error_report", date: new Date(), body: err})
    res.status(500).json({body: err.body, message: err.message})
  })


  return app
}

