const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://anusharaj1811_db_user:tmLyn6SLBs3I5wbB@nodejs.gznkr71.mongodb.net/DevTinder?retryWrites=true&w=majority&appName=NodeJS",
      {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4, // Use IPv4, skip trying IPv6
      }
    );
    
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

module.exports = connectDB;
