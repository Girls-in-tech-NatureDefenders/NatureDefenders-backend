const {User}  = require("../models/userModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//handle errors
const handleErrors = (err)=>{
    console.log(err.message, err.code)
    let errors = { fullName:'', email:'', password:'', countryOfResidence:'', role:''}

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
            console.log('user created')
    res.status(201).json(user)
    
    }
    
    catch (err){
       const errors = handleErrors(err)
    res.status(400).json({errors})
    }
}

module.exports.login_post =(req, res)=>{
    
}