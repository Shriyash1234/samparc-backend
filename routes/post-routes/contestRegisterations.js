const express = require("express");
const router = express.Router();

const contestRegistration = require('../../models/contestRegisterations');

router.post("/addContestRegistration", function (req, res) {
    const registrationData = req.body;
  
    const registerResponse = new contestRegistration({
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