const express = require("express")
const router = express.Router()
// const middleware = require("../middleware")

//middlewares
const { redirectIfLoggedIn, isUserLoggedIn } = require("../middlewares/auth")


module.exports = (params) => {
    const { avatars } = params
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/users/login?error=true" // this passes a query parameter to the get route
    }))
    
    router.get("/login", redirectIfLoggedIn, (req, res) => {
        res.render("users/login", {
            error: req.query.error
        })
    } )

    router.get("/logout", (req, res) => {
        req.logout()
        return res.redirect("/")
    })

    router.get("/registration", redirectIfLoggedIn, async (req, res, next) => {
        try {
            res.render("users/registration", {
                success: req.query.success
            })
        } catch (error) {
            return next(error)
        }
    })


    //middleware upload.single is from multer for accepting a single file with the name attribute specified
    //middleware handleAvatar just checks if an avatar is passed and its format
    router.post("/registration", 
    // middleware.upload.single("avatar"), 
    // middleware.handleAvatar(avatars), 
    async (req, res, next) => {
        try {
            const user = UserModel({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })

            const savedUser = await user.save()

            if(savedUser) return res.redirect("/user/registration?success=true")
            return next(new Error("user was not saved successfully to the db!"))
        } catch (error) {
            //in the event of an error while registering the user, the avatar if it exists should be deleted from memory
            //so they should do it again, and not have duplicate data
            if (req.file && req.file.storedFilename){
                await avatars.delete(req.file.storedFilename)
            }
            return next(error)
        }
    })

    router.get("/account", isUserLoggedIn, async (req, res, next) => {
        try {
            res.render("users/account", {
                user: req.user
            })
            new HttpError(500, "Internal server error")
        } catch (error) {
            return next(error)
        }
    })

    router.get("/avatar/:filename", (req, res) => {
        res.type("png"||"jpg")
        return res.sendFile(avatars.filepath(req.params.filename))
    })

    router.get("/avatartn/:filename", async (req, res) =>{
        res.type("png")
        const tn = await avatars.thumbnail(req.params.filename)
        return res.end(tn, "binary")
    })

    return router
}


