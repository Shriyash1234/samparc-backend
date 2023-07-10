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
    responses: {
      type: Object,
      default: {},
    },
  });
  const quizRegisterationSchema = new mongoose.Schema({
    responses: Object
  });
  const QuizResponse = mongoose.model("quizResponses", quizResponseSchema);
  const Registration = mongoose.model("registrations", quizRegisterationSchema);

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
  console.log(quizResponses);

  const response = new QuizResponse({
    registration: {},
  });

  quizResponses.forEach((responseObj, index) => {
    const responseKey = `response${index + 1}`;
    response.responses[responseKey] = {
      question: responseObj.question,
      selectedOption: responseObj.selectedOption,
    };
  });

  response
    .save()
    .then(() => {
      console.log("Quiz responses saved successfully");
      res.redirect("https://shriyash1234.github.io/Samparc/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error saving quiz responses");
    });
});

app.post("/addRegistration", function (req, res) {
  const registrationData = req.body;
  console.log(registrationData);

  const registerResponse = new Registration({
    responses: registrationData,
  });

  registerResponse
    .save()
    .then(() => {
      console.log("Registration saved successfully");
      res.redirect("https://shriyash1234.github.io/Samparc/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error saving registration");
    });
});



const port = process.env.port||4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
