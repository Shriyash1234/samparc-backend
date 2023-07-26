const mongoose = require("mongoose");

const quizResponseSchema = new mongoose.Schema({
    details:{
      type: Object,
      default: {},
    },
    score:{
      type: Object,
      default: {},
    },
    responses: {
      type: Object,
      default: {},
    },
  });
const QuizResponse = mongoose.model("quizResponses", quizResponseSchema);
module.exports = QuizResponse  
