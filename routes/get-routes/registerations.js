const express = require("express");
const router = express.Router();

const Registration = require('../../models/quizRegisteration')

router.get("/registerations", async (req, res) => {
    try {
      const registerations = await Registration.find().exec();
      res.json(registerations);
    } catch (err) {
      console.error('Failed to retrieve data from the collection:', err);
      res.status(500).json({ error: 'Failed to retrieve data' });
    }
  });
module.exports = router;  