const { generateToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");
const authRepository = require("../repository/authRepository");

//REGISTER API
exports.registerUser = async (req,res)=> {
    try{
        console.log('registerUser: request body', req.body);
        const{ name, email, password, phone }= req.body;
        console.log('registerUser: parsed fields', { name, email, password: !!password, phone });
        if(!name||!email||!password||!phone){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
    
    const existingUser=await authRepository.findUserByEmail(email);
    console.log('registerUser: existingUser', !!existingUser);
    if(existingUser){
        return res.status(400).json({
             success:false,
             message:"User already exists"
        });
    }
    const hashedPassword=await bcrypt.hash(password, 10);
    console.log('registerUser: hashed password created');
    const user=await authRepository.createUser({
        name,
        email,
        password:hashedPassword,
        phone
    });
    console.log('registerUser: user created', user._id.toString());
    return res.status(201).json({
        message:"User registered successfully",
        user
    });
}
catch(error) {
    console.error("registerUser error:", error);
    res.status(500).json({
        message:"Server error"
    });
}
};

exports.loginUser = async (req,res) => {
    try {
        const {email, password } = req.body;

        //step 1: Validate Request
        if(!email || !password)   {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }
    
    const user = await authRepository.findUserByEmail(email)
    if(!user) {
        return res.status(400).json({
            message:"Invalid email or password"
        });
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) {
        return res.status(400).json({
            message:"Invalid email or password"
        });
    }

    //token payload
    const payload = {
        userId: user._id,
        email: user.email,
        name: user.name
    };

    //generate token
    const token = generateToken(payload);

    return res.status(200).json({
        message:"Login Successful",
        token,
        user,
    });
    }   catch (error) {
       res.status(500).json ({
        message:"Internal Server Error"
       }) ;
    }
     

}
