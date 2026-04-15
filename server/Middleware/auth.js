const jwt = require('jsonwebtoken')
const usermodel = require('../Models/user.model')


const protect = async(req,res,next) => {
    let token; 
     if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }else{
        return res.status(401).json({mesaage : "not authorized "})
    }
    if(token){
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await usermodel.findById(decoded.id).select('-password')
            if(!req.user){
                return res.status(401).json({
                    message : "Not authorized"
                })
            }
            next();
        }catch(err){
            console.log("error",err);
        }
    }else{
        return res.json({message : "Not authorized token"})
    }
}


const admin = (req,res,next) => {
    if(req.user && req.user.role == 'admin'){
        next();
    }else{
        return res.status(403).json({
            message : "forbidden,admin acess required"
        })
    }
}


module.exports = {protect,admin}