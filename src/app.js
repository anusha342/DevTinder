const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");


app.use(express.json());
app.use(cookieParser());

app.post("/signup",async(req, res) => {
   
try{
    //validation of data
    validateSignUpData(req);
    
    const {firstName, lastName, emailId, password} = req.body;

    // Encrypt the password
     const passwordHash =await bcrypt.hash(password, 10);
     console.log(passwordHash);

    //creating new instance of the User model
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
    });
 
    await user.save(); 
    res.send("User Added succesfully");
    }
    catch(err){
     res.status(400).send("ERROR : "+ err.message);
    }
});

app.post("/login", async(req, res)=>{
    try{
       const{emailId, password} = req.body;

       const user = await User.findOne({emailId: emailId});
       if(!User){
        throw new Error("Invalid credentials");
       }
       const isPasswordValid = await bcrypt.compare(password, user.password);

       if(isPasswordValid){
        //Create a JWT Token
        
        const token = await jwt.sign({ _id: user._id }, "DevTinder@123", {
          expireIn: "7d",
       });
        //Add the token to cookie and send the response back to the user

        res.cookie("token",token,{
            expires: new Date(Date.now() + 8 * 3600000),
     });
        res.send("Login Successfully!!");
    }
       else{
        throw new Error("Invalid credentials");
       }
    }
    catch(err){
     res.status(400).send("ERROR : "+ err.message);
    }
});

app.get("/profile", userAuth, async (req, res) =>{
  try{
  const user = req.user;
  res.send(user);
  }catch(err){
     res.status(400).send("ERROR : "+ err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, async(req, res) =>{
   const user = req.user;
   //sending a connection request
   console.log("Sending a connection request");
   res.send(user.firstName + " sent the connection request!!");
});

connectDB() 
     .then(() => {
        console.log("Database connection established..");
        app.listen(7777, () => {
         console.log("Server is Successfully listenning on port 7777...");
        });
     })
     .catch((err) =>{
        console.log("Database cannot be connected!!");
     });  