const mongoose = require("mongoose");

const contestRegisterationSchema = new mongoose.Schema({
    responses: Object
  });
const contestRegisteration = mongoose.model("ContestRegistrations", contestRegisterationSchema);
module.exports = contestRegisteration  