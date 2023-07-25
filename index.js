const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


const dbName = "Samparc";
mongoose
  .connect(process.env.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: dbName,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

  const quizResponseSchema = new mongoose.Schema({
    details:{
      type: Object,
      default: {},
    },
    score:{
      type: Object,
      default: {},
    },
    responses: {
      type: Object,
      default: {},
    },
  });
  const userPasswordSchema = new mongoose.Schema({
    userName:String,
    userEmail:String,
    password:String
  })
  const quizRegisterationSchema = new mongoose.Schema({
    responses: Object
  });
  const QuizResponse = mongoose.model("quizResponses", quizResponseSchema);
  const Registration = mongoose.model("registrations", quizRegisterationSchema);
  const UserPassword = mongoose.model("passwords",userPasswordSchema);
app.get("/responses", async (req, res) => {
  try {
    const quizresponses = await QuizResponse.find().exec();
    res.json(quizresponses);
  } catch (err) {
    console.error('Failed to retrieve data from the collection:', err);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});
app.get("/registerations", async (req, res) => {
  try {
    const registerations = await Registration.find().exec();
    res.json(registerations);
  } catch (err) {
    console.error('Failed to retrieve data from the collection:', err);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

app.post("/addquizresponses", function (req, res) {
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

app.post("/addRegistration", function (req, res) {
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
app.post("/addUserPassword", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;


  const passwordResponse = new UserPassword({
    userName:name,
    userEmail:email,
    password:password
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
app.post("/checkpassword", async (req, res)=> {
  const userEmail = req.body.email;
  const password = req.body.password;

  try {
    // Find the user with the given username
    const user = await UserPassword.findOne({ userEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password === password) {
      const name =user.userName
      return res.json({ message: 'ok', userName:name });
    } else {
    
      return res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});




const port = process.env.port||4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
