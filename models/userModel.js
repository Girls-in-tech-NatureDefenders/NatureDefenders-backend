const  mongoose  = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true,'please enter your fullname'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'please enter your email'],
    unique: true,
    lowercase: true,
    validate:[isEmail, 'please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'please enter a password'],
    unique: true,
    minlength: [8,'minimum password length is 8 character']
    
  },
  countryOfResidence: {
    type: String,
    required: [true, 'please enter your country of residence'],
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
  
},
{
 timestamps:true  
}
);

userSchema.pre('save', async function (next){
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password,salt)
  next()
})

userSchema.statics.login = async function(email, password){
  const user = await this.findOne({email})
  if(user){
    const auth = await bcrypt.compare(password,user.password)
  if(user){
    return user
  }throw Error('incorrect password');
  }
  throw Error('incorrect email')
}

const User = mongoose.model("user", userSchema);

module.exports = {User}