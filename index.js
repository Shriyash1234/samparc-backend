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
  Response: String,
});
const quizResponse = mongoose.model("quizResponses", quizResponseSchema);

app.get("/responses", async (req, res) => {
  try {
    const quizresponses = await quizResponse.find().exec();
    res.json(quizresponses);
  } catch (err) {
    console.error('Failed to retrieve data from the collection:', err);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});
app.post("/addquizresponse",function(req,res){  
  const selectedOption = req.body.selectedOption; 
  console.log('Selected Option:', selectedOption);                    
  const response = new quizResponse({
    Response:selectedOption,
  });
  response.save()
  .then(() => {
    console.log("Response Saved succesfully");
  })
  .catch(function (err) {
    console.log(err);
  });;
   res.redirect("http://localhost:3000/Samparc")  
})
const port = process.env.port||4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
