const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require('cookie-parser'); 
dotenv.config()



const cors = require("cors")
const mongoose  = require("mongoose")
const authRouter = require("./Routers/auth.router")
const eventRouter = require("./Routers/event")
const bookingRouter= require("./Routers/booking")



const app = express()
app.use(cors({
 origin: [
  "http://localhost:5173",
  "https://your-frontend-url.onrender.com"
],
credentials: true
}));


app.use(express.json())
app.use(cookieParser()); 

mongoose.connect(process.env.MONGO_URI)
   .then(() => {
    console.log("database connected successfully")
   })
   .catch((err) => {
      console.log(err);
   })



app.use('/api/auth',authRouter)
app.use('/api/events',eventRouter)
app.use("/api/booking", bookingRouter);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});