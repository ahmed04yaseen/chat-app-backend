const Chat = require("../models/chatModel");
const MessageModel = require("../models/messageModel");

exports.createMessage = async(req,res)=>{
    const { content, chatId } = req.body;
  const Message = new MessageModel({
    sender: req.user._id, content, chat: chatId
  });
  try {
    const a1 = await Message.save();
    // if(a1){
    //     Chat.findOne({_id: chatId}).update({latestMessage: a1._id}).exec((err,result)=>{
    //         if(err){
    //             console.log(err)
    //         }else{
    //             console.log(result)
    //         }
    //     })
    // }
    res.json(a1);
  } catch (err) {
    res.send(err);
  }
}

exports.getMessages = async(req,res)=>{
    const {chatId} = req.body;
    MessageModel.find({chat:chatId}).populate("sender").exec((err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}