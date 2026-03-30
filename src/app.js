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

// Cache the DB connection promise so it's reused across serverless invocations
let dbConnected = false;
const ensureDbConnected = async () => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
    console.log("Database connection established..");
  }
};

// Middleware to ensure DB is connected before handling any request
app.use(async (req, res, next) => {
  try {
    await ensureDbConnected();
    next();
  } catch (err) {
    console.error("DB connection failed:", err.message);
    res.status(500).json({ error: "Database connection failed" });
  }
});

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

// Only listen when NOT on Vercel (i.e., local development)
if (process.env.VERCEL !== "1") {
  const port = process.env.PORT || 7777;
  app.listen(port, () => {
    console.log(`Server is Successfully listening on port ${port}...`);
  });
}

// Export for Vercel
module.exports = app;
