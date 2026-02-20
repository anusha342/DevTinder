const express = require('express')
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user")

app.post("/signup",async(req, res) => {

    //creating new instance of the User model
    const user = new User({
        firstName: "Anusha",
        lastName: "Raj",
        emailId: "anusharaj@gmail.com",
        password: "Anusha123"
    });
 
    try{
    await user.save(); 
    res.send("User Added succesfully");
    }
    catch(err){
     res.satatus(400).send("Error saving the user:"+ err.message);
    }
});


connectDB()
     .then(() => {
        console.log("Database connection established..");
        app.listen(7777, () => {
         console.log("Server is Successfully lestenning on port 7777...");
        });
     })
     .catch((err) =>{
        console.log("Database cannot be connected!!");
     });