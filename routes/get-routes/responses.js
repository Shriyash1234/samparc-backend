const express = require("express");
const router = express.Router();

const QuizResponse = require('../../models/quizresponse');

router.get("/responses", async (req, res) => {
    try {
      const quizresponses = await QuizResponse.find().exec();
      res.json(quizresponses);
    } catch (err) {
      console.error('Failed to retrieve data from the collection:', err);
      res.status(500).json({ error: 'Failed to retrieve data' });
    }
  });
module.exports = router;  