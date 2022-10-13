function redirectIfLoggedIn(req, res, next){
    if(req.user) return res.redirect("/user/account")
    return next()
}

function isUserLoggedIn(req, res, next){
    if (req.user) return next() // this is a middleware to check if a user exists
    return res.status(401).end() // returns an error and ends the res cycle if the req obj has no user
}

module.exports = { redirectIfLoggedIn, isUserLoggedIn }