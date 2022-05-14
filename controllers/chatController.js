const Chat = require("../models/chatModel");
const User = require("../models/userModel")
exports.createChat = async (req,res)=>{
    const { userId } = req.body;
    console.log(userId)

    if (!userId) {
        return res.sendStatus(400);
      }

      var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.user._id } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })
        .populate("users", "-password")
        .populate("latestMessage");
    
      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
      });
    
      if (isChat.length > 0) {
        res.send(isChat[0]);
      } else {
        var chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [req.user._id, userId],
        };
    
        try {
          const createdChat = await Chat.create(chatData);
          const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
          );
          res.status(200).json(FullChat);
        } catch (error) {
          res.status(400);
          throw new Error(error.message);
        }
      }
}


exports.getChats = async (req, res) => {
    try {
      Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name photo email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
  
  exports.getChatDetails = async (req,res)=>{
    const {id} = req.body;
    Chat.findOne({_id: id}).populate("users").exec((err,result)=>{
      if(err){
        res.send(err)
      }else{
        res.send(result)
      }
    })
  }

  exports.createGroup = async(req,res)=>{
    const { chatName, users, groupPhoto } = req.body;
    console.log(chatName)
    
    users.push(req.user._id)
    const groupChat = new Chat({
      chatName, users, groupPhoto, isGroupChat: true, groupAdmin : req.user._id
    });
    try {
      const a1 = await groupChat.save();
      res.json(a1);
    } catch (err) {
      res.send("error");
    }
  }

  exports.removeUser = async(req,res)=>{
    const {users, chatId} = req.body
    await Chat.findOne({_id: chatId}).update({users: users}).exec((err,result)=>{
      if(err){
        res.send(err)
      }else{
        res.send(result)
      }
    })
  }

  exports.addUser = async(req,res)=>{
    const {users, chatId} = req.body
    await Chat.findOne({_id: chatId}).update({users: users}).exec((err,result)=>{
      if(err){
        res.send(err)
      }else{
        res.send(result)
      }
    })
  }