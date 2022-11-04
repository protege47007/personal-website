const express = require("express")
const router = express.Router()

module.exports = () => {
    router.get("/", async (req, res, next) => {
        try {
            //get blog files from api
            res.render('blog')
        } catch (error) {
            return next(error)
        }
    })

    return router
}
