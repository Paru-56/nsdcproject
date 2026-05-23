const User = require("../models/userModel");

//FIND USER BY EMAIL
exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

//CREATE USER
exports.createUser = async (userData) => {
    return await User.create(userData);
};