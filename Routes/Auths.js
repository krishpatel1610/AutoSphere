const express = require('express');
const Admin = require('../Model/Admin');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSecure = "Mynameiskpandyoutube!!!##"; // secure key
const verifyToken = require('../Middleware/fetchDetails'); 
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // For generating OTP
const app = express(); // Create an express app instance
app.set("view engine", "ejs"); // Set view engine to ejs
app.use(express.urlencoded({ extended: false }));
// const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/createAdmin', async (req, res) => {
    try {
        if (req.body.password !== req.body.cpassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ email: req.body.email }).collation({ locale: 'en', caseLevel: true, strength: 2 });
        if (existingAdmin) {
            return res.status(400).json({ error: "Admin already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new admin
        await Admin.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

router.post("/loginAdmin",async(req,res)=>{
    // const error = validationResult(req);
    //     if(!error.isEmpty()){
    //         return res.status(400).json({ error: error.array() });
    //     }

    let email = req.body.email;
    let password = req.body.password;
    try{
        let userData = await Admin.findOne({email}).collation({ locale: 'en', caseLevel: true, strength: 2 });
        if(!userData)
        {
            return res.status(400).json({ error: "enter valid email!!" });
        }
        const pwdCompare = await bcrypt.compare(password,userData.password); // compairing entered password with the stored encrypted password using bcrypt compare algorithms.
        if(!pwdCompare)
        {
            return res.status(400).json({ error: "enter valid password!!" });
        }

        const Data = {
            user:{
                id: userData.id,
                name: userData.name,
                type: 'Admin'
            }
        }
        const authToken = jwt.sign(Data,jwtSecure); // Generating authToken using the user id and jwtSecure key user doesn't know about secure key.
        res.json({success:true,authToken:authToken});
    }catch(error){
        console.log(error)
        res.json({success:false});
    }
});

router.get('/Admin/auth/protected-route', verifyToken, async (req, res) => {
    // Only executed if the token is valid
    res.status(200).json({ success:true,message: 'Protected employee route accessed successfully.', user: req.user });
});

// Function to generate OTP
const generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };
  
  // Store OTPs temporarily (in production, use a database or session)
  const otpStore = {};
  
  // Nodemailer transporter setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'adityarajcoder09@gmail.com',
        pass: 'gvksrridgzhadfsc'
    }
  });
  
  // Route to send OTP to email
  router.post('/sendOTP', async (req, res) => {
    const { email } = req.body;
  
    try {
      // Generate OTP
      const OTP = generateOTP();
      otpStore[email] = OTP; // Store OTP temporarily (for demonstration)
  
      // Send email
      await transporter.sendMail({
        from: 'autosphere@gmail.com',
        to: email,
        subject: 'Email verification code',
        text: `Your OTP for email verification code is ${OTP}`
      });
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ success: false, error: 'Failed to send OTP. Please try again later.' });
    }
  });
  
  // Route to verify OTP
  router.post('/verifyOTP', (req, res) => {
    const { email, OTP } = req.body;
  
    // Compare OTP with stored OTP
    if (otpStore[email] === OTP) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, error: 'Invalid OTP. Please try again.' });
    }
  });

  app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
      const olduser = await Admin.findOne({ email });
      if (!olduser) {
        return res.json({ status: "Admin not found" });
      }
      const secret = jwtSecure + olduser.password;
      const token = jwt.sign({ email: olduser.email, id: olduser._id }, secret, { expiresIn: "5m" });
      const link = `http://localhost:5000/api/reset-password/${olduser._id}/${token}`;
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'adityarajcoder09@gmail.com',
          pass: 'gvksrridgzhadfsc'
        }
      });
      
      var mailOptions = {
        from: 'autosphere@gmail.com',
        to: email,
        subject: 'Reset Password',
        text: link
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      console.log(link);
    } catch (error) {
      console.error(error);
    }
  });
  
  app.get("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await Admin.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "Admin not found" });
    }
    const secret = jwtSecure + oldUser.password;
    try {
      console.log("verified")
      const verify = jwt.verify(token, secret);
      res.render("index", { email: verify.email, id, token ,status:"Not verified"});
    } catch (error) {
      console.error(error);
      res.send("Not verified");
    }
  });
  
  app.post('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
  
    try {
      // Check if the password field is provided
      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }
  
      // Find the admin by id
      const oldUser = await Admin.findOne({ _id: id });
      if (!oldUser) {
        return res.json({ status: "Admin not Exists!" });
      }
  
      // Verify the token
      const secret = jwtSecure + oldUser.password;
      const verify = jwt.verify(token, secret);
  
      // Hash the new password
      const encryptedPassword = await bcrypt.hash(password, 10);
      console.log("Encrypted Password:", encryptedPassword);
  
      // Update the password in the database
      await Admin.updateOne({ _id: id }, {
        $set: {
          password: encryptedPassword,
        }
      });
  
      // Respond with success message
      res.render("index", { email: verify.email, id, token ,status:"verified"});
  
    } catch (error) {
      console.error(error);
      res.send("Not verified");
    }
  });

module.exports = [router , app];
