// 1️⃣ Import packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const recipeRoutes = require("./routes/recipeRoutes");

// 2️⃣ Create app
const app = express();

// 3️⃣ Middleware
app.use(cors());
app.use(express.json());

// 4️⃣ Connect to MongoDB Atlas
mongoose.connect(
  "mongodb+srv://AchyuthSai:Achyuth%40123@recipedb.lqb3ysy.mongodb.net/recipeDB?retryWrites=true&w=majority",
  { dbName: "recipeDB" }
)
.then(() => console.log("✅ MongoDB Atlas connected"))
.catch(err => console.error("MongoDB connection error:", err));

// 5️⃣ Routes
app.use("/recipes", recipeRoutes);

// 6️⃣ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
