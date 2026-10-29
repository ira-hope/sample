const express = require("express");
const cors = require("cors");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Student Registration API is running",
  });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
