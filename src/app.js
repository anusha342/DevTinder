const express = require('express')
const app = express();
const {adminAuth, userAuth} = require("./middlewares/auth")


app.use("/", (err, req, res, next) => {
    if(err){
        res.status(500).send("Something went wrong");
    }
});

app.get("/getUserData", (req, res) => {
    try{
         throw new Error("kdfhal");
         res.send("User Data Sent");
    }
    catch(err){
        res.status(500).send("Some Error contact support team");
    }
});

app.use("/", (err, req, res, next) => {
    if(err){
        res.status(500).send("Something went wrong");
    }
});


app.listen(7777, () => {
 console.log("Server is Successfully listening on port 7777..");
});