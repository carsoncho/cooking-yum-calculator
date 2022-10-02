import React from "react";
import { useForm } from "react-hook-form";
import IngredientSelect from "./IngredientSelect";

export default function IngredientsList(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const maxCount = props.maxCount;
  let ingredients = props.ingredients;

  function onSubmit(data) {
    props.nextStep();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Ingredients List</h2>
      <p>You may choose up to 3 ingredients to include in this meal.</p>
      <button onClick={() => props.prevStep()}>Prev</button>
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
                register={register}
                errors={errors}
                handleIngredientSelection={props.handleIngredientSelection}
                handleRemoveIngredient={props.handleRemoveIngredient}
                getIngredientAttributes={props.getIngredientAttributes}
                formatIngredientAttributes={props.formatIngredientAttributes}
              />
            }
          </li>
        ))}
      </ul>
      <input type="submit" value="Next" />
    </form>
  );
}
