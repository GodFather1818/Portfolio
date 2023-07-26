require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3000 || process.env.PORT;
const moment = require("moment-timezone");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.CONNECT, {
  useNewUrlParser: true,
});

const contactUsSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  jobRole: String,
  city: String,
  pincode: String,
  date: String,
});

const Applicant = new mongoose.model("Applicant", contactUsSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/PersonalPortfolio.html");
});

app.get("/aboutus", (req, res) => {
  res.sendFile(__dirname + "/AboutUs.html");
});

app.get("/contactus", (req, res) => {
  res.sendFile(__dirname + "/ContactUs.html");
});
app.get("/thankyoupage", (req, res)=>{
    res.sendFile(__dirname + "/Thankyou.html");
});

// ---------------Post Route ------------------------

app.post("/contactus", (req, res) => {
  const currentDateIST = moment().tz("Asia/Kolkata");
  // console.log(currentDateIST);
  const submissionDate = currentDateIST.format("YYYY-MM-DDTHH:mm:ss");

  const apply = new Applicant({
    fname: req.body.first_name,
    lname: req.body.last_name,
    email: req.body.email,
    jobRole: req.body.job_role,
    city: req.body.city,
    pincode: req.body.pincode,
    date: submissionDate,
  });
  console.log(apply);
  apply
    .save()
    .then(() => {
      console.log("Successfully Saved to Database.");
      res.redirect("/thankyoupage");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
