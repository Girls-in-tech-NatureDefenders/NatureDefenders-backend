const  mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    validate:{
        validator: function (v) {
            // Replace with actual Ethereum address validation regex
            return /^0x[a-fA-F0-9]{40}$/.test(v);
          },
          message: "Invalid wallet address",
        },
    },
  
  password: {
    type: String,
    required: true,
    unique: true,
    
    validate: {
      validator: function (v) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v);
         
      },
      message: "Password must contain at least 8 characters, one number, one lowercase letter, and one uppercase letter",
    },
  },
  countryOfResidence: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin","funder"],
    default: "funder",
    required: false,
    validate: {
      validator: function (v) {
        return /^(admin|funder)$/.test(v);
      },
      message:"Invalid role value: {VALUE}",
    },
  },
  timestamps: true,
});
const User = mongoose.model("User", userSchema);

module.exports = { User };
