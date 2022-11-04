const createError = require("http-errors")
const Admin = require("../../models/about")



module.exports = async (req, res, next) => {
    try{

        const newAdmin = Admin({
            full_name: "Adewumi David",
            mail: process.env.MAIL,
            dob: "November '96",
            password: process.env.PASSWORD,
            location: "Lagos, Nigeria", 
            job: "Software Engineer",
            bio: "Hi there👋, I'm David, welcome to my website. I'm a web developer🤓, a fan of Manchester United❤️ (even in this trying times 🤧), and love video games."
        })

        const savedAdmin = await newAdmin.save()
        if(savedAdmin) return (res.status(200).json({body: savedAdmin, message: "Admin created successfully"}))

        return next(createError(501, "Internal Server Error"))

    }catch(error){
        return next(createError(501, "Internal Server Error"))
    }
}