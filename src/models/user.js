const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength:3,
        maxLength:50,
    },
    lastName:{
        type: String,
    },
    emailId:{
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address:" + value);
            }
        },
    },
    password:{
        type: String,
        required: true,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password:" + value);
            }
        },
    },
    age:{
        type: Number,
        min:15,
    }, 
    gender:{
        type: String,
        validate(value){
            if(!["male", "female", "others"]. includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl:{
        type: String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK-5-DUAn8F-Uj_pHNDRyprT6W7FV4WVEBtw&s",
         validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL:" + value);
            }
        },
    },
    about:{
        type: String,
        default:"This is a default about of the user!"
    }, 
    skills:{
        type:[String],
    }
   },
      {
        timestamps: true,
        }
);


module.exports = mongoose.model("User",userSchema);