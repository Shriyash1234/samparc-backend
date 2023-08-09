const express = require("express");
const router = express.Router();

const Registration = require('../../models/quizRegisteration')

router.post("/updateProfileGivenRegisteration", async (req, res) => {
  const registrationData = req.body.registerationResponse;;
  try {
    const newRegistration = {
      ContestName: registrationData.contestName,
      ContestCode: registrationData.contestCode,
      time: new Date().toLocaleTimeString()
    };

    const updatedDoc = await Registration.findOneAndUpdate(
      { "responses.email": registrationData.email },
      { $push: { "responses.GivenRegistrations": newRegistration } },
      { new: true }
    );

    if (updatedDoc) {
      res.json({ success: true, message: "Registration added successfully", updatedDoc });
    } else {
      res.status(404).json({ success: false, message: "Document not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding registration" });
  }
});
  
module.exports = router;  