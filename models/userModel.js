const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 100
    },
    password: {
        type: String,
        required: true,
    },
    photo: {type:String, default:"uploads/1652350895241avatar.png"}
}, {timestamps:true})

module.exports= mongoose.model('users', userSchema);
