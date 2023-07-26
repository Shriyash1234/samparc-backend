const express = require("express");
const router = express.Router();

const Registration = require('../../models/quizRegisteration');

router.post("/addRegistration", function (req, res) {
    const registrationData = req.body;
  
    const registerResponse = new Registration({
      responses: registrationData,
    });
  
    registerResponse
      .save()
      .then(() => {
        res.json({ success: true, message: "Registration successful" });
      })
      .catch((err) => {
        res.status(500).json({ success: false, message: "Error saving registration" });
      });
  });
  
module.exports = router;  