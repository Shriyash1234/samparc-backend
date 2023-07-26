const express = require("express");
const router = express.Router();

const QuizResponse = require('../../models/quizresponse');

router.post("/addquizresponses", function (req, res) {
    const quizResponses = req.body.quizResponses;
  
    const response = new QuizResponse({
      registration: {},
    });
    response.details['personal'] ={
      name:quizResponses[0].name,
      mail:quizResponses[0].mail,
      time:quizResponses[0].time,
      timetaken:quizResponses[0].timetaken
    } 
    response.score['scores'] ={
      score:quizResponses[0].score,
      numberOfQuestions:quizResponses.length - 1
    }
    quizResponses.forEach((responseObj, index) => {
      const responseKey = `response${index}`;
      response.responses[responseKey] = {
        question: responseObj.question,
        selectedOption: responseObj.selectedOption,
      };
    });
  
    response
      .save()
      .then(() => {
        res.redirect("https://shriyash1234.github.io/Samparc/");
      })
      .catch((err) => {
        res.status(500).send("Error saving quiz responses");
      });
  });
module.exports = router;  