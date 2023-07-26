const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const UserPassword = require('../../models/userPassword');

router.post("/addUserPassword", function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
  
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Error generating salt" });
      }
  
      bcrypt.hash(password, salt, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ success: false, message: "Error hashing password" });
        }
  
        const passwordResponse = new UserPassword({
          userName: name,
          userEmail: email,
          password: hashedPassword // Store the hashed password in the database
        });
  
        passwordResponse
          .save()
          .then(() => {
            res.json({ success: true, message: "Registration successful" });
          })
          .catch((err) => {
            res.status(500).json({ success: false, message: "Error saving registration" });
          });
      });
    });
  });
module.exports = router;  