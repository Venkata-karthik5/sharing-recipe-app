import { useState } from "react";
import "./RecipeList.css";

export default function RecipeList({ recipes, onLike, onComment }) {
  const [likedRecipe, setLikedRecipe] = useState(null);
  const [commentText, setCommentText] = useState({});

  const handleLike = (id) => {
    onLike(id);
    setLikedRecipe(id);
    setTimeout(() => setLikedRecipe(null), 800); // reset animation
  };

  const handleComment = (id, e) => {
    if (e.key === "Enter") {
      onComment(id, commentText[id] || "");
      setCommentText({ ...commentText, [id]: "" });
    }
  };

  if (!recipes || recipes.length === 0) {
    return <div className="empty-msg">No recipes available 🍳</div>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((r) => (
        <div key={r._id} className="recipe-card">
          <img
            src={r.image || "https://via.placeholder.com/320x200?text=No+Image"}
            alt={r.title || "recipe"}
            className="recipe-image"
          />
          <div className="recipe-title">🍕 {r.title}</div>
          <div className="cuisine">🌎 {r.cuisine}</div>
          <div className="ingredients">🥦 {r.ingredients?.join(", ")}</div>
          <div className="instructions">👩‍🍳 {r.instructions}</div>

          <button
            onClick={() => handleLike(r._id)}
            className={`like-btn ${likedRecipe === r._id ? "liked" : ""}`}
          >
            ❤️ {r.likes || 0} Likes
            <span className="heart">❤️</span>
          </button>

          <div className="comment-section">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText[r._id] || ""}
              onChange={(e) =>
                setCommentText({ ...commentText, [r._id]: e.target.value })
              }
              onKeyDown={(e) => handleComment(r._id, e)}
            />
            {r.comments &&
              r.comments.map((c, index) => (
                <div key={index} className="comment">
                  {c}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}


