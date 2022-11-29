const express = require("express")
const router = express.Router()
const createError = require("http-errors")
const findAll = require("../utilities/findAll")
const portfolio = require("../models/portfolio")

module.exports = ({portfolioService}) => {
    router.get("/", async (req, res, next) => {
        try {
            
            // const projects = await findAll(portfolio)
            const projects = await portfolioService.getPortfolio()
            
            res.render('portfolio', {projects})

        } catch (error) {
            return next(createError(500, {body: error, message: "internal server error"}))
        }
    })


    return router
}