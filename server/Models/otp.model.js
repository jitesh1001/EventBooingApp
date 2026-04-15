const mongoose = require("mongoose")


const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        require : true
    },
    otp:{
        type : String,
        require : true
    },
    action : {
        type : String,
        enum : ["account verification","event_booking"],
        require : true
    },
    createdAt : {
        type : Date,
        default :Date.now(),
        expires : 300

    }

})


const otpModel = mongoose.model("Otp",otpSchema);


module.exports  = otpModel