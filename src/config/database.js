const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
    "mongodb+srv://anusharaj1811_db_user:tmLyn6SLBs3I5wbB@nodejs.gznkr71.mongodb.net/?appName=NodeJS"
);
}; 

module.exports = connectDB;

     
 