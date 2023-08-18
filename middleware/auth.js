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

                //check if user role exist
                const userRole = decodedToken.role;

                 //Assuming you have an array of roles that have access
        const allowedRoles = ['Admin', 'Funder'];
        if(allowedRoles.includes(userRole)){
            next() 
        }else{
            res.status(403).json({ error: 'Unauthorized access' })
        }
                
            }
        })
    }
    else{
    res.redirect('/login')
    }
    
}
module.exports = {requireAuth}