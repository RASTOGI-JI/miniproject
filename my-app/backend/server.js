const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protected");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

// API health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    // Start server even if MongoDB connection fails
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (MongoDB connection failed)`);
      console.log('Please make sure MongoDB is running locally on port 27017');
    });
  });
