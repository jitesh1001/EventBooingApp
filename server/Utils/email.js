const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config()


const transporter = nodemailer.createTransport({
     service: "gmail",
    auth: {
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    }
});




const sendBookingEmail = async(userEmail,userName,eventTitle) => {
    try{
            const mailOptions = {
            from :process.env.EMAIL_USER,
            to : userEmail,
            subject : `Booking confirmed : ${eventTitle}`,
            html : `
              <h2> Hi ${userName}! </h2>
              <p> your booking for the event <strong>${eventTitle} </strong> is successfully confirmed </p>
              <p> Thank you for choosing everyone. </p>
            `
        };

           await transporter.sendMail(mailOptions);
           
        
    }catch(err){
        console.log("error sending mail",err);

    }
}

const sendOtpMail = async(userEmail,otp,type) => {
    try{
        const title = type === 'account verification' ? "verify your account" : "Event booking confirm"
        const msg = type === 'account verification' ?
        "Please use the following OTP to verify you account.":
        "Please use the following OTP to verify and confirm your event booking.";
        const mailOptions = {
            from : process.env.EMAIL_USER,
            to : userEmail,
            subject : title,
            html : `
            <div>
            <h2> ${title} </h2>
            <p> ${msg} </p>
            <div>
            ${otp}
            </div>
            <p> this code expires in 5 minutes </p>
            </div>

            `
           
        };
        await transporter.sendMail(mailOptions);
    } catch(err){
        console.log("error sending mail",err)

    }
}


module.exports = {sendBookingEmail,sendOtpMail};