const mongoose = require("mongoose")
require('dotenv').config()

const dbURI = process.env.MONGO_URI

const dbConnection= ()=>{
    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
    })
      .then(() => console.log("database connected"))
      .catch((err) => console.log(err));
}

module.exports = {dbConnection}