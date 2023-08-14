const jwt = require('jsonwebtoken')
const secret = process.env.MY_SECRET
const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt

    //verify jwt exist
    if(token){
        jwt.verify(token, secret,(err, decodedToken)=>{
            if(err){
                console.log(err.message)
                res.redirect('/login')
            }else{
                console.log(decodedToken)
                next()
            }
        })
    }
    else{
        res.redirect('login')
    }
    
}
module.exports = {requireAuth}