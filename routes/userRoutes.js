const express = require("express");
const { createUser, image, imageUpload, login, searchUsers, getMyUserId, getSingleUser, getMe, getAllUsers } = require("../controllers/userController");
const { protect } = require("../middlewares/protect");
const upload = require("../middlewares/upload")


const router = express.Router();

router.post("/register", createUser)
router.post("/imageUpload", upload.single("file"), imageUpload)
router.post("/login", login)
router.post("/searchUsers", searchUsers)
router.get("/getMyUserId", protect, getMyUserId)
router.post("/getSingleUser", getSingleUser)
router.get("/getMe",protect, getMe)
router.get("/getAllUsers", getAllUsers)
router.get("/test", async(req,res)=>{
    res.send("successfull")
})
module.exports = router;