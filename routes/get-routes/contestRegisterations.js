const express = require("express");
const router = express.Router();

const ContestRegistration = require('../../models//contestRegisterations')

router.get("/contestRegisterations", async (req, res) => {
    try {
      const registerations = await ContestRegistration.find().exec();
      res.json(registerations);
    } catch (err) {
      console.error('Failed to retrieve data from the collection:', err);
      res.status(500).json({ error: 'Failed to retrieve data' });
    }
  });
module.exports = router;  