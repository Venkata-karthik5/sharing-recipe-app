// 1️⃣ Import packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const recipeRoutes = require("./routes/recipeRoutes");

// 2️⃣ Create app
const app = express();

// 3️⃣ Middleware
app.use(cors());
app.use(express.json());

// 4️⃣ Connect to MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://AchyuthSai:Achyuth%40123@recipedb.lqb3ysy.mongodb.net/recipeDB?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, { 
  dbName: "recipeDB",
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
.then(() => console.log("✅ MongoDB Atlas connected"))
.catch(err => {
  console.error("⚠️ MongoDB connection error:", err.message);
  console.log("🔄 Server will continue running without database connection");
  console.log("💡 To fix: Check MongoDB Atlas IP whitelist or use local MongoDB");
});

// 5️⃣ Routes
app.use("/api/recipes", recipeRoutes);

// Health check endpoint for Vercel
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// 6️⃣ Serve React build for UI (non-API routes)
const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));

// Fallback to index.html for any non-API route
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return next();
  }
  res.sendFile(path.join(buildPath, "index.html"));
});

// 7️⃣ Start server unless running in Vercel serverless
// Render sets NODE_ENV=production but expects the app to listen on PORT
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📝 API endpoints available at http://localhost:${PORT}/api/recipes`);
    console.log(`🎨 UI available at http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
