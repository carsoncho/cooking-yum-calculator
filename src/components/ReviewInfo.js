import React, { useEffect } from "react";

export default function ReviewInfo(props) {
  let {
    gameSystem,
    currentSkills,
    mealType,
    getMealType,
    cookingStation,
    getCookingStation,
    currentIngredients,
  } = props;

  let currentSkillsKeys = Object.keys(currentSkills);
  let currentSkillValues = Object.values(currentSkills);

  //   useEffect(() => {
  //       effect
  //       return () => {
  //           cleanup
  //       }
  //   }, [])

  /**
   *
   * @param {string} skillId
   * @returns
   */
  function getSkillName(skillId) {
    let skill = gameSystem.skills.find((element) => {
      return element._id === skillId;
    });
    return skill.name;
  }

  return (
    <form>
      <h2>Review</h2>
      <button onClick={() => props.prevStep()}>Prev</button>
      <p>
        <strong>Game System</strong>: {gameSystem.name}
      </p>
      <p>
        <strong>Player skills</strong>:
      </p>
      <ul>
        {currentSkillsKeys.map((element, key) => {
          return (
            <li key={key}>
              {getSkillName(element)} - {currentSkillValues[key]}
            </li>
          );
        })}
      </ul>
      <p>
        <strong>Meal type</strong>: {getMealType(mealType).name}
      </p>
      <p>
        <strong>Cooking station</strong>:{" "}
        {getCookingStation(cookingStation).name}
      </p>
      <p>
        <strong>Chosen ingredients</strong>:
      </p>
      <ul>
        {currentIngredients.map((ingredientName, key) => {
          let ingredient = props.getIngredientByName(
            gameSystem._id,
            ingredientName
          );
          let attributes = props.formatIngredientAttributes(ingredient);

          return (
            <li key={key}>
              {ingredient.name} ({attributes})
            </li>
          );
        })}
      </ul>
      <button onClick={props.nextStep}>Next</button>
    </form>
  );
}
