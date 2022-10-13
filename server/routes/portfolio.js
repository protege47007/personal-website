const express = require("express")
const router = express.Router()

module.exports = () => {
    router.get("/", async (req, res, next) => {
        try {
            res.render('portfolio')
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