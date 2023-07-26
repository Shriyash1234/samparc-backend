const mongoose = require("mongoose");

const userPasswordSchema = new mongoose.Schema({
    userName:String,
    userEmail:String,
    password:String
  })
const UserPassword = mongoose.model("passwords",userPasswordSchema);
module.exports = UserPassword  
