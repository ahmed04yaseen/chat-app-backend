const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};


exports.createUser = async (req,res)=>{
    const { name, email, password, photo } =
      req.body;

      // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);


    const _user = new userModel({
    name, email, password : hashedPassword, photo
    });
    try {
      const a1 = await _user.save();
      res.json({
        data: a1,
        token: generateToken(a1._id)
      });
    } catch (err) {
      res.status(400).send("error");
    }
}

exports.imageUpload = async (req,res)=>{
  res.send(req.file.path)
}

exports.login = async(req,res)=>{
  const { email, password } = req.body;
  console.log(req.body)

  // Check for user email
  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
  
    res.json({
      user: user,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Invaid creds")
    
  }
}

exports.searchUsers = async (req,res) =>{
  const {text} = req.body;

  var re = new RegExp(text, 'i');
  userModel.find({'name': { $regex: re }}).exec((err,result)=>{
    if(err){
      res.send(err)
    }else{
      res.send(result)
    }
  })
}

exports.getMyUserId = async(req,res)=>{
  res.send(req.user._id)
}
exports.getSingleUser = async(req,res)=>{
  userModel.findOne({_id : req.body.id}).exec((err,result)=>{
    if(err){
      res.send(err)
    }else{
      res.send(result)
    }
  })
}

exports.getMe = async (req,res)=>{
  res.send(req.user)
}

exports.getAllUsers = async(req,res)=>{
  userModel.find({}).exec((err,result)=>{
    if(err){
      res.send(err)
    }else{
      res.send(result)
    }
  })
}