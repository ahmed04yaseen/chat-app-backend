const express = require("express");
const { createChat, getChats, getChatDetails, createGroup, removeUser, addUser } = require("../controllers/chatController");
const { protect } = require("../middlewares/protect");



const router = express.Router();

router.post("/createChat",protect, createChat)
router.get("/",protect, getChats)
router.post("/getChatDetails", getChatDetails)
router.post("/createGroup", protect, createGroup)
router.post("/removeUser", removeUser)
router.post("/addUser", addUser)

module.exports = router;