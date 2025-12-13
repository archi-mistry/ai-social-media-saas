const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// 🔹 Connect to MongoDB
connectDB();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Test route
app.get("/ping", (req, res) => {
  res.send("pong");
});

// 🔹 Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);


// 🔹 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
