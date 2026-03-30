require('dotenv').config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
  origin: process.env.FRONTEND_URL || true,
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// Root route for testing
app.get("/", (req, res) => {
  res.json({ message: "DevTinder API is running!" });
});

connectDB()
  .then(() => {
    console.log("Database connection established..");
  })
  .catch((err) => {
    console.log("Database cannot be connected!! Starting server anyway...");
    console.log("Error:", err.message);
  })
  .finally(() => {
    const port = process.env.PORT || 7777;
    app.listen(port, () => {
      console.log(`Server is Successfully listening on port ${port}...`);
    });
  });

// Export for Vercel
module.exports = app;
