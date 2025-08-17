import { useEffect, useState } from "react";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import SearchBar from "./components/SearchBar";
import "./styles.css";

function App() {
  const [recipes, setRecipes] = useState([]);

  // Fetch all recipes from backend
  const fetchRecipes = async () => {
    try {
      const res = await fetch("http://localhost:5000/recipes");
      const data = await res.json();
      setRecipes(data || []);
    } catch (err) {
      console.error("Backend not reachable:", err);
      setRecipes([]);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Add recipe
  const addRecipe = async (recipe) => {
    try {
      await fetch("http://localhost:5000/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });
      fetchRecipes();
    } catch (err) {
      console.error(err);
    }
  };

  // Like recipe
  const likeRecipe = async (id) => {
    try {
      await fetch(`http://localhost:5000/recipes/${id}/like`, { method: "POST" });
      fetchRecipes();
    } catch (err) {
      console.error(err);
    }
  };

  // Comment recipe
  const commentRecipe = async (id, comment) => {
    try {
      await fetch(`http://localhost:5000/recipes/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      });
      fetchRecipes();
    } catch (err) {
      console.error(err);
    }
  };

  // Search recipes
  const searchRecipes = async (query) => {
    if (query === "") {
      fetchRecipes();
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/recipes/search/${query}`);
      const data = await res.json();
      setRecipes(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>🍲 Recipe Sharing App</h1>
      <SearchBar onSearch={searchRecipes} />
      <RecipeForm onAdd={addRecipe} />
      <RecipeList
        recipes={recipes || []}
        onLike={likeRecipe}
        onComment={commentRecipe}
      />
    </div>
  );
}

export default App;
