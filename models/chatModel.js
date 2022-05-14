const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "messages",
    },
    isGroupChat: { type: Boolean, default: false },

    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    groupPhoto: { type: String , default: "uploads/1652350895241avatar.png"},
  },

  { timestamps: true }
);

const Chat = mongoose.model("chats", chatModel);

module.exports = Chat;
