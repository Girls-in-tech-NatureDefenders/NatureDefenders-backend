const express = require("express");
const app = express()
const port = process.env.PORT || 4000


//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

//   Api Health Checker
app.get("/api/healthchecker", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to NatureDefender",
  });
});



app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });