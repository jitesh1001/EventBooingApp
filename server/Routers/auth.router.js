const express = require("express");
const router = express.Router();
const {protect} = require("../Middleware/auth")
const {registerUser,loginUser,verifyOtp,current,logoutUser} = require('../Controllers/auth.controller')


router.post('/register',registerUser);
router.post("/login",loginUser);
router.post("/otpverify",verifyOtp);
router.get("/me", protect, current); 
router.post("/logout",protect,logoutUser);
module.exports = router;