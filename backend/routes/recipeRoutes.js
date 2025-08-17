const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");

// Helper function to check database connection
const checkDBConnection = () => {
  return mongoose.connection.readyState === 1;
};

// POST new recipe
router.post("/", async (req, res) => {
  try {
    if (!checkDBConnection()) {
      return res.status(503).json({ error: "Database not connected" });
    }
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all recipes
router.get("/", async (req, res) => {
  try {
    if (!checkDBConnection()) {
      return res.status(503).json({ error: "Database not connected" });
    }
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LIKE a recipe
router.post("/:id/like", async (req, res) => {
  try {
    if (!checkDBConnection()) {
      return res.status(503).json({ error: "Database not connected" });
    }
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    recipe.likes++;
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// COMMENT on a recipe
router.post("/:id/comment", async (req, res) => {
  try {
    if (!checkDBConnection()) {
      return res.status(503).json({ error: "Database not connected" });
    }
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    recipe.comments.push(req.body.comment);
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SEARCH recipes by cuisine or ingredient
router.get("/search/:query", async (req, res) => {
  try {
    if (!checkDBConnection()) {
      return res.status(503).json({ error: "Database not connected" });
    }
    const query = req.params.query;
    const recipes = await Recipe.find({
      $or: [
        { cuisine: { $regex: query, $options: "i" } },
        { ingredients: { $regex: query, $options: "i" } }
      ]
    });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
