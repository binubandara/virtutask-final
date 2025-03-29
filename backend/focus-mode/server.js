const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB using 127.0.0.1 to avoid connection issues
mongoose.connect("mongodb+srv://binu20230681:binubandara@virtutask.nmivs.mongodb.net/electron_focus", {})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Root route to handle base URL requests
app.get("/", (req, res) => {
  res.send("Welcome to the Focus Mode API! Use /api/tasks or /api/sessions to interact.");
});

// Routes
const taskRoutes = require("./routes/taskRoutes");
const sessionRoutes = require("./routes/SessionRoutes");

app.use("/api/tasks", taskRoutes);
app.use("/api/sessions", sessionRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
