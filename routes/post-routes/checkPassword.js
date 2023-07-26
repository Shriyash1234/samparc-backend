const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const UserPassword = require('../../models/userPassword');

router.post("/checkpassword", async (req, res) => {
    const userEmail = req.body.email;
    const password = req.body.password;
  
    try {
      const user = await UserPassword.findOne({ userEmail });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
        }
  
        if (result) {
          const name = user.userName;
          return res.json({ message: 'ok', userName: name });
        } else {
          return res.status(401).json({ message: 'Incorrect password' });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
module.exports = router;  