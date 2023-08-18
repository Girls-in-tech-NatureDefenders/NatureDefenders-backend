//handle errors
const handleErrors = (err)=>{
    console.log(err.message, err.code)
    let errors = { fullName:'', email:'', password:'', countryOfResidence:'', selectedRole:''}
    
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

module.exports = {handleErrors}