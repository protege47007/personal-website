router.get("/avatar/:filename", (req, res) => {
    res.type("png"||"jpg")
    return res.sendFile(avatars.filepath(req.params.filename))
})

router.get("/avatartn/:filename", async (req, res) =>{
    res.type("png")
    const tn = await avatars.thumbnail(req.params.filename)
    return res.end(tn, "binary")
})