const {User}  = require("../models/userModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = process.env.MY_SECRET
// const tokenAge = 100 * 60 * 60 * 24; // 24 hour

//handle errors
const handleErrors = (err)=>{
    console.log(err.message, err.code)
    let errors = { fullName:'', email:'', password:'', countryOfResidence:'', role:''}
    
    //incorrect email and password error handler
    if(err.message === 'incorrect email'){
        errors.email = 'that email is not registered'
    }
    if(err.message === 'incorrect password'){
        errors.password = 'that password is incorrect'
    }


    //duplicate error code
    if(err.code ===11000){
        errors = 'user already exist'
        return errors
    }
    //validation errors
    if (err.message.includes('User validation failed')){
        (Object.values(err.errors)).forEach(({properties}) =>{
        errors[properties.path] = properties.message
        })
    }
    return errors
}
const maxAge = 3*24*60*60
const createToken = (id)=>{
    return jwt.sign({id}, secret,{
        expiresIn:maxAge 
    })
}

module.exports.register_get = async (req, res)=>{

}

module.exports.login_get =(req, res)=>{
    
}
module.exports.register_post = async(req, res)=>{
    const {
        fullName,
        email,
        password,
        countryOfResidence,
        role}= req.body
        
        try{
        const user = await User.create({
            fullName,
            email,
            password,
            countryOfResidence,
            role});
            const token = createToken(user._id)
            res.cookie('jwt', token,{maxAge: maxAge*1000} )
            console.log('user created')
    res.status(201).json({user:user._id})
    
    }
    
    catch (err){
       const errors = handleErrors(err)
    res.status(400).json({errors})
    }
}

module.exports.login_post = async(req, res)=>{
  const {email, password} = req.body
  
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
            res.cookie('jwt', token,{maxAge: maxAge*1000} )
    res.status(200).json({user: user._id})
  } catch (err) {
   const errors = handleErrors(err)
   res.status(400).json({errors}) 
  }
}

module.exports.logout_get=(reg, res) =>{
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/')
}