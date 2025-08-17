const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: String,
  cuisine: String,
  ingredients: [String],
  instructions: String,
  likes: { type: Number, default: 0 },
  comments: [String]
});

module.exports = mongoose.model("Recipe", recipeSchema);
