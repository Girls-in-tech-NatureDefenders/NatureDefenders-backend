const express = require("express");
const bodyParser = require("body-parser");
const { useTreblle } = require("treblle");
const mongoose = require("mongoose");
require("dotenv").config();

const route = require("./routes/userRoutes");

const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

//Database
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

//use treblle middleware
useTreblle(app, {
  apiKey: process.env.TREBLLE_API_KEY,
  projectId: process.env.PRODUCT_API_KEY,
});

//   Api Health Checker
app.get("/api/healthchecker", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to NatureDefender",
  });
});

//userRoute router
app.use("/", route);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
