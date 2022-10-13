const express = require("express")
const router = express.Router()

module.exports = () => {
    router.get("/", async (req, res, next) => {
        try {
            console.log("reached blog")
            res.render('blog')
        } catch (error) {
            return next(error)
        }
    })

    return router
}