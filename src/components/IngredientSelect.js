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

  /**
   *
   * @param {*} ingredient
   * @returns
   */
  function getIngredientAttributes(ingredient) {
    let attributes = ingredient.attributes;
    let filtered = Object.keys(attributes).filter((element, key) => {
      return attributes[element] === true;
    });

    return `${filtered[0]} + ${filtered[1]}`;
  }

  return (
    <div>
      <label>Ingredient</label>
      <select
        onChange={(event) => {
          props.handleIngredientSelection(event, props.index);
        }}
      >
        {ingredientsList.map((group, index) => (
          <optgroup key={index} label={group.type}>
            {group.ingredients.map((ingredient, key) => (
              <option key={key} value={ingredient.name}>
                {ingredient.name} ({getIngredientAttributes(ingredient)})
              </option>
            ))}
          </optgroup>
        ))}
      </select>
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
