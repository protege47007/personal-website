const express = require("express")
const router = express.Router()

module.exports = ({portfolioService}) => {
    router.get("/", async (req, res, next) => {
        try {
            

            const projects = await portfolioService.getPortfolio()
            // console.log(projects)
            res.render('portfolio', {projects})
        } catch (error) {
            return next(error)
        }
    })

    router.post("/", async (req, res, next) => {
        try {
            
        } catch (error) {
            return next(error)
        }
    })

    return router
}