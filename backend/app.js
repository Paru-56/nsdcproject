const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/authRoutes");
const app = express();
app.use((req, res, next) => {
    console.log(`REQUEST ${req.method} ${req.url}`);
    next();
});
app.use(express.json());
app.use(cors());
app.use("/api/v1/users",userRoutes);
module.exports = app;
