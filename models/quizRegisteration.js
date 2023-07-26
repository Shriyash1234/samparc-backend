const mongoose = require("mongoose");

const quizRegisterationSchema = new mongoose.Schema({
    responses: Object
  });
const Registration = mongoose.model("registrations", quizRegisterationSchema);
module.exports = Registration  