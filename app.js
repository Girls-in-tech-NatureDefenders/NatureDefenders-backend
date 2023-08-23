const express = require("express");
const bodyParser = require("body-parser");
const { useTreblle } = require("treblle");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const cookieParser = require('cookie-parser');
const projectRoutes = require("./routes/projectRoutes");
const { requireAuth, authorizeAdmin } = require("./middleware/auth");


const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));
app.use(cookieParser());

//debugging middleware for looging cookies
app.use((req, res, next) => {
  console.log("cookies",req.cookies);
  next();
});

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

// Middleware: Require Authentication
app.use("/projects", requireAuth);

// Middleware: Admin Authorization
app.use("/projects/create", authorizeAdmin);


//userRoute router
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
