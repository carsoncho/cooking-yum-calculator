import React, { useEffect } from "react";
import IngredientSelect from "./IngredientSelect";

export default function IngredientsList(props) {
  console.log(props);
  const maxCount = props.maxCount;
  let ingredients = props.ingredients;

  return (
    <div>
      <h2>Ingredients List</h2>

      <button
        disabled={ingredients.length >= maxCount}
        onClick={() => {
          props.handleAddIngredient();
        }}
      >
        Add Ingredient
      </button>
      <ul className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {
              <IngredientSelect
                index={index}
                gameSystem={props.gameSystem}
                handleIngredientSelection={props.handleIngredientSelection}
                handleRemoveIngredient={props.handleRemoveIngredient}
              />
            }
          </li>
        ))}
      </ul>
    </div>
  );
}
