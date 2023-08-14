const jwt = require('jsonwebtoken')
const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt

    //verify jwt exist
    if(token){
        
    }
}