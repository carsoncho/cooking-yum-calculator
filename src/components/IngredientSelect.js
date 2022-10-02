import { select } from "async";
import React, { useEffect } from "react";
import { useState } from "react";
import ingredientsPf from "../static/ingredients-pf.json";

export default function IngredientSelect(props) {
  let [ingredientsList, setIngredients] = useState([]);

  useEffect(() => {
    selectIngredientsFromGameSystem(props.gameSystem);
  }, [ingredientsList]);

  /**
   *
   * @param {*} systemId
   */
  function selectIngredientsFromGameSystem(systemId) {
    switch (systemId) {
      case "dnd5e":
        // @TODO: Create other data structures
        console.alert("Create ingredients for " + systemId);
        break;
      case "pf":
      case "sf":
        setIngredients(ingredientsPf);
        break;
      default:
        break;
    }
  }

  const selectId = "ingredient-" + props.index;

  return (
    <div>
      {props.errors[selectId] && <span>You must select an ingredient.</span>}
      <label>Ingredient</label>
      <select
        id={selectId}
        className="ingredient-select"
        {...props.register(selectId, {
          required: true,
          onChange: (event) => {
            props.handleIngredientSelection(event, props.index);
          },
        })}
      >
        <option value="">- Select -</option>
        {ingredientsList.map((group, index) => (
          <optgroup key={index} label={group.type}>
            {group.ingredients.map((ingredient, key) => (
              <option key={key} value={ingredient.name}>
                {ingredient.name} (
                {props.formatIngredientAttributes(ingredient)})
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      {/* Only show remove for buttons other than the first one */}
      {props.index > 0 && (
        <button
          onClick={() => {
            props.handleRemoveIngredient(props.index);
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
}
