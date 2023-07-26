const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();

//Declaring App
const app = express();
app.use(cors());
app.use(bodyParser.json());

//Get routes
const getResponsesRoutes = require('./routes/get-routes/responses');
const getRegisterationRoutes = require('./routes/get-routes/registerations')
app.use(getResponsesRoutes);
app.use(getRegisterationRoutes);

//Post routes
const addQuizResponse = require('./routes/post-routes/quizResponse')
const addRegistration = require('./routes/post-routes/registerations')
const addUserPassword = require('./routes/post-routes/userPassword')
const checkPassword = require('./routes/post-routes/checkPassword')
app.use(addQuizResponse);
app.use(addRegistration);
app.use(addUserPassword);
app.use(checkPassword);

//Connecting MongoDB
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


//Running on the port
const port = process.env.port||4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
