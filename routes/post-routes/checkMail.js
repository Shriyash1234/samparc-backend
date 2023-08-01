const express = require("express");
const router = express.Router();

const UserPassword = require('../../models/userPassword');

router.post("/checkMail", async (req, res) => {
    const userEmail = req.body.email;
    try {
      const user = await UserPassword.findOne({ userEmail });
  
      if (!user) {
        return res.json({ message: 'NotFound'});
      }
      if(user){
        return res.json({ message: 'Found'});
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
module.exports = router;  