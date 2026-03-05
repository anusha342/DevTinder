const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
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
    },
    password:{
        type: String,
        required: true,
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
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK-5-DUAn8F-Uj_pHNDRyprT6W7FV4WVEBtw&s"
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