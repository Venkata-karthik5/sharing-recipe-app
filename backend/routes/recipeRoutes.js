const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

// POST new recipe
router.post("/", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all recipes
router.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// LIKE a recipe
router.post("/:id/like", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  recipe.likes++;
  await recipe.save();
  res.json(recipe);
});

// COMMENT on a recipe
router.post("/:id/comment", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  recipe.comments.push(req.body.comment);
  await recipe.save();
  res.json(recipe);
});

// SEARCH recipes by cuisine or ingredient
router.get("/search/:query", async (req, res) => {
  const query = req.params.query;
  const recipes = await Recipe.find({
    $or: [
      { cuisine: { $regex: query, $options: "i" } },
      { ingredients: { $regex: query, $options: "i" } }
    ]
  });
  res.json(recipes);
});

module.exports = router;
