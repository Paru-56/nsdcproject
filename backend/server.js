//importing express module
const express = require('express');
//calling express function
const app = require("./app");

const connectDB = require("./config/db");
connectDB();
//middleware to parse json bodies
app.use(express.json());

//define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello World!!!!')
});

const PORT =3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
