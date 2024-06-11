const express = require('express');
const Admin = require('../Model/Admin');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSecure = "Mynameiskpandyoutube!!!##"; // secure key
const verifyToken = require('../Middleware/fetchDetails'); 

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



module.exports = router;
