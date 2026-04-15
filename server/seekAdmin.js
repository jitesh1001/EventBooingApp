const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./Models/user.model")
const dotenv = require("dotenv")

dotenv.config();



// 🔹 Connect DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

const createAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ role: "admin" });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        await User.create({
            name: "Admin",
            email: "jiteshjain0110@gmail.com",
            password: hashedPassword,
            role: "admin",
            isVerified: true
        });

        console.log("Admin created successfully");
        process.exit();

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

createAdmin();