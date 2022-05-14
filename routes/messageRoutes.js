const express = require("express");
const { createMessage, getMessages } = require("../controllers/messageController");
const { protect } = require("../middlewares/protect");



const router = express.Router();
router.post("/createMessage",protect, createMessage)
router.post("/getMessages", getMessages)


module.exports = router;