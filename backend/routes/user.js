import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
const router = express.Router();
import jwt from "jsonwebtoken"
import authenticatetoken from "./userAuth.js";

//sign up
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, address } = await req.body;

    //check username length is more than 4
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username should be atleast of 4 characters" });
    }

    //check username already exists
    const existingusername = await User.findOne({ username: username });
    if (existingusername) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    //check email already exists
    const existinguseremail = await User.findOne({ email: email });
    if (existinguseremail){
      return res.status(400).json({ message: "Email is already taken" });
    }

    //check password length is more than 5
    if (password.length < 6){
      return res
        .status(400)
        .json({ message: "Password should be atleast of 6 characters" });
    }
    
    //hashing the password
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await new User({
      username,
      email,
      password: hashedpassword,
      address,
    });
    await user.save();
    return res.status(200).json({ message: "Signup Successfull" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect){
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const authClaims = [
        {name : existingUser.name},
        {role : existingUser.role}
    ]
    const token = await jwt.sign({authClaims},process.env.secretkey,{
        expiresIn:'30d'
    })
    
    return res.status(200).json({id:existingUser._id,role:existingUser.role,token:token});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//get-user information
router.get('/getUserInfo',authenticatetoken,async(req,res)=>{
    try{
        const {id} = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    }catch(error){
        res.status(500).json({ message : 'Internal Server Error'});
    }
})

//update address
router.put('/updateAddress',authenticatetoken,async(req,res)=>{
        try{
            const {id} = req.headers;
            const {address} = req.body;
            await User.findByIdAndUpdate(id,{address:address});
            return res.status(200).json({ message : 'Address updated Successfully'});
        }catch(error){  
            return res.status(500).json({ message : "Internal Server Error"})
        }
})
export default router;