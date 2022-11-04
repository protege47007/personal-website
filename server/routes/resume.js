const express = require("express")
const router = express.Router()

module.exports = ({ aboutService }) => {
    router.get("/", async (req, res, next) => {
        try {
            const resume = await aboutService.getResume()
            
            res.render('resume', {resume})
        } catch (error) {
            return next(error)
        }
    })

    router.post("/", async (req, res, next) => {
        
    })
    return router
}