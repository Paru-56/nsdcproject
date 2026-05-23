const mongoose = require("mongoose");
require("dotenv").config();

//DATABASE CONNECTION FUNCTION
const connectDB = async() => {
    try {
        //connect mongodb
        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB Connected Successsfully");

    } catch (error) {
        console.log("Database Connection Error",error);

        process.exit(1);
    }
};
module.exports = connectDB;
