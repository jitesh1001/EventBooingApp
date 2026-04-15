const usermodel = require("../Models/user.model")
const otpModel = require ("../Models/otp.model")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

const {sendOtpMail} = require("../Utils/email")


const generateToken  = (id,role) => {
    return jwt.sign({id,role},process.env.JWT_SECRET,{expiresIn:'7d'})
}




const current = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
const registerUser = async (req,res) => {
    try{
       
        const {name,email,password} = req.body;


        if(!name || !email || !password){
            return res.status(400).json({
                message : "all feild are required"
            })
        }


        const userexists = await usermodel.findOne({email})

        if(userexists){
            return res.status(400).json({
                message  : "user already exists"
            })
        }

        const salt  = 10
        const hashpassword = await bcrypt.hash(password,salt)

        const user = await  usermodel.create({name,email,password : hashpassword,role : "user",isVerified : false});


        const otp = Math.floor(100000 + Math.random() * 900000).toString();

       
        const otpobj = await otpModel.create({email,otp,action : 'account verification'})

         console.log(otpobj)

        await sendOtpMail(email,otp,'account verification')


        res.status(201).json({
            user : user,
            message : "user register succesfully. please check ur mail for otp"
        });

       
    }catch(err){
        console.log(err);
        res.status(500).json({
            message : "Server error",
            error : err.message
        })

    }

}


const loginUser =async (req,res) => {
    try{
        const {email,password} = req.body;

    const user = await usermodel.findOne({email});
    if(!user){
        return res.status(400).json({
            message : "wrong credentials"
        })
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({
            message : "wrong credentials"
        })
    }

    if(!user.isVerified){
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await otpModel.deleteMany({email,action : "account verification"})
        await otpModel.create({email,otp,action : 'account verification'})
        await sendOtpMail(email,otp,'account verification')
        return res.status(400).json({
            message : "please verify the account"
        })

    }



   const  token = generateToken(user._id,user.role)
   res.cookie("token", token, {
    httpOnly: true,
     sameSite: "lax",
     secure: false 
    
   });



    res.status(200).json({
        message : "user logged in",
        token,
        user:user
       

    })
    }catch(err){
        console.log("error",err);
    }


}


const verifyOtp = async (req,res) => {
    try{
        const {email,otp} = req.body;
        const otpRecord = await otpModel.findOne({email,otp,action : "account verification"} )
        if(!otpRecord){
            return res.status(400).json({
                message : "wrong otp"
            })
        }

        const user = await usermodel.findOneAndUpdate({email},{isVerified : true})
        await otpModel.deleteMany({email,action : "account verification"})


        
       const  token = generateToken(user._id,user.role)
       res.cookie("token", token, {
        httpOnly: true,
         sameSite: "lax",
        secure: false 
       });

        res.json({
        message : "account verifies successfully",
        token ,
        user : user
    })
    }
    catch(err){
        console.log("error",err);
    }

    

}
const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });
  res.status(200).json({ message: "Logged out successfully" });
};
module.exports = {registerUser,loginUser,verifyOtp,current,logoutUser}