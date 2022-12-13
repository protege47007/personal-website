const mongoose = require("mongoose")
const Grid = require("gridfs-stream")
const mongoose = require("mongoose")
Grid.mongo = mongoose.mongo
// const { GridFsBucket } = require("multer-gridfs-storage")


const db_connection = mongoose.connection

db_connection.once("open", ()=>{
  const gfs = Grid(db_connection.db)
})

router.delete("/:imageID", auth, async (req, res) => {
    try {
      const post = await Post.findOne({ image: req.params.imageID });
      console.log(post);
      if (post.user != req.user.id) {
        res.status(401).send("Invalid credentials");
      }
  
  // Here:
      const obj_id = new mongoose.Types.ObjectId(req.params.imageID);
      gfs.delete( obj_id );
  
      await post.remove();
      res.json("successfully deleted image!");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });