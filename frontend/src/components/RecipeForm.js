import React, { useState } from "react";
import "./RecipeForm.css";

export default function RecipeForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !cuisine || !ingredients || !instructions) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    onAdd({
      title: title || "🍕 Delicious Dish",
      cuisine: cuisine || "🌎 Cuisine",
      ingredients: ingredients
        ? ingredients.split(",").map((i) => i.trim())
        : ["🥦 Ingredients"],
      instructions: instructions || "👩‍🍳 Cooking Instructions",
      image: image || "https://via.placeholder.com/320x200?text=No+Image",
    });

    // Reset form fields
    setTitle("");
    setCuisine("");
    setIngredients("");
    setInstructions("");
    setImage("");
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <h2>🍲 Add Your Recipe</h2>

      <input
        placeholder="🍕 Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="🌎 Cuisine Type"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
      />

      <input
        placeholder="🥦 Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <textarea
        placeholder="👩‍🍳 Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />

      <input
        placeholder="🖼️ Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button type="submit">➕ Add Recipe</button>
    </form>
  );
}

