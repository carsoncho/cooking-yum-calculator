import React, { useState } from "react";
import gameSystemData from "../static/gamesystems.json";
import mealTypeData from "../static/meal-types.json";
import cookingStationData from "../static/cooking-stations.json";
import GameSystemSelect from "./GameSystem";
import CharacterSkillsInput from "./CharacterSkillsInput";
import { element } from "prop-types";
import MealTypeSelect from "./MealTypeSelect";
import CookingStationSelect from "./CookingStationSelect";
import IngredientsList from "./IngredientsList";

export default function IngredientsCalculator() {
  const [step, setStep] = useState(1);
  const [systemSelection, setSystemSelection] = useState("");
  const [currentSkills, setCurrentSkills] = useState({});
  const [selectedMealType, setMealType] = useState("");
  const [selectedCookingStation, setCookingStation] = useState("");
  const [currentIngredients, setCurrentIngredients] = useState([{}]);

  /**
   * Increment to next 'step'.
   */
  function nextStep() {
    let currentStep = step;
    setStep(currentStep + 1);
  }

  /**
   * Decrement to the previous 'step'.
   */
  function prevStep() {
    let prevStep = step;
    setStep(prevStep - 1);
  }

  /**
   * Handles selecting the game system.
   *
   * @todo merge this with handleCookingStationSelect since they do the same thing.
   *
   * @param {Event} event
   *   The onChange event from system select component.
   */
  function handleSystemSelection(event) {
    setSystemSelection(event.target.value);
  }

  /**
   * Handles when skill input is changed.
   *
   * @param {Event} event
   *   The event.
   * @param {string} skill
   *   The skill ID.
   */
  function handleCurentSkillsInput(event, skill) {
    setCurrentSkills({ ...currentSkills, [skill]: event.target.value });
  }

  /**
   * Handles when meal type input is changed.
   *
   * @todo merge this with handleCookingStationSelect since they do the same thing.
   *
   * @param {Event} event
   *   The event.
   * @param {string} skill
   *   The skill ID.
   */
  function handleSetMealTypeSelection(event) {
    setMealType(event.target.value);
  }

  /**
   * Handles when cooking state input is changed.
   *
   * @param {Event} event
   *   The event.
   * @param {string} skill
   *   The skill ID.
   */
  function handleCookingStationSelection(event) {
    setCookingStation(event.target.value);
  }

  /**
   * Handles setting the selected ingredient at specific index in array.
   *
   * @param {Event} Event
   *   The onChange event from the ingredient select.
   * @param {integer} index
   *   The index position of the ingredient array being editted.
   */
  function handleIngredientSelection(event, index) {
    // 1. Make a shallow copy of the currentIngredients.
    let ingredients = [...currentIngredients];
    // 2. Make a shallow copy of the item you want to mutate.
    let ingredient = { ...ingredients[index] };
    // 3. Replace the property you're intested in
    ingredient = event.target.value;
    // 4. Put it back into our array. N.B. we *are* mutating the array here,
    //    but that's why we made a copy first
    ingredients[index] = ingredient;
    setCurrentIngredients(ingredients);
  }

  /**
   * Adds an empty object to the ingredients array.
   */
  function addIngredient() {
    let ingredients = [...currentIngredients];
    ingredients.push({});
    setCurrentIngredients(ingredients);
  }

  /**
   * Removes a specific index from the ingredients array.
   *
   * @param {integer} index
   */
  function removeIngredient(index) {
    let ingredients = [...currentIngredients];
    let filtered = ingredients.filter((item, key) => {
      return key !== index;
    });
    setCurrentIngredients(filtered);
  }

  /**
   * Returns the selected game system by ID.
   *
   * @param string systemId
   *   The game system ID to retrieve.
   * @returns array
   *   The array of skill objects.
   */
  function getGameSystemSkills(systemId) {
    let gs = gameSystemData.find((element) => {
      return element._id === systemId;
    });
    return gs.skills;
  }

  /**
   * Returns a meal-type by ID.
   *
   * @see '../static/meal-types.json'
   *
   * @param {string} mealId
   *   The speciifc meal-type ID.
   * @returns
   *   The found meal-type object.
   */
  function getMealType(mealId) {
    return findElement(mealId, mealTypeData);
  }

  /**
   * Finds a specific cooking station.
   *
   * @param {integer} cookingStationId
   *   The ID of the cooking station to find.
   * @returns
   *   The found cooking station object.
   */
  function getCookingStation(cookingStationId) {
    return findElement(cookingStationId, cookingStationData);
  }

  /**
   * Finds a specific element from provided data.
   *
   * @param {*} id
   *   The ID to lookup against the data.
   * @param {Array} data
   *   The array of data to search against. NOTE: each element must include an 'id' property.
   * @returns
   *   The found element from the array.
   */
  function findElement(id, data) {
    return data.find((element) => {
      return element.id === id;
    });
  }

  /**
   * Determines the a final bonus for a skill.
   *
   * Starting at 20 and every 5th number after that return a +1 bonus,
   * i.e. 20 = +1, 24 = +1, 25 = +2, 29 = +2, 30 = +3, etc.
   *
   * @param integer value
   *   The skill total score to determine bonus for.
   * @returns
   *   The skill bonus integer.
   */
  function determineBonus(skillTotal) {
    // Once we get past 40 it maxes out at 5.
    if (skillTotal >= 41) {
      return 5;
    }

    let initial = skillTotal - 20;
    return Math.ceil((initial + 1) / 5);
  }

  /**
   * Boolean method to check if game system has been chosen.
   *
   * @returns boolean
   *   True if system selection has been made, false otherwise.
   */
  function isGameSystemSelected() {
    return !!systemSelection;
  }

  /**
   * Boolean method to check if meal type has been set.
   *
   * @returns boolean
   *   True if meal type has been selected, false otherwise.
   */
  function isMealTypeSelected() {
    return !!selectedMealType;
  }

  return (
    <div className="ingredients-calculator">
      <GameSystemSelect handleSystemSelection={handleSystemSelection} />

      {isGameSystemSelected() === true &&
        getGameSystemSkills(systemSelection).map((element, index) => {
          return (
            <CharacterSkillsInput
              key={index}
              {...element}
              handleCurentSkillsInput={handleCurentSkillsInput}
            />
          );
        })}

      <MealTypeSelect handleSetMealTypeSelection={handleSetMealTypeSelection} />
      <CookingStationSelect
        handleCookingStationSelection={handleCookingStationSelection}
      />
      {isGameSystemSelected() === true && (
        <IngredientsList
          maxCount="3"
          gameSystem={systemSelection}
          ingredients={currentIngredients}
          handleIngredientSelection={handleIngredientSelection}
          handleAddIngredient={addIngredient}
          handleRemoveIngredient={removeIngredient}
        />
      )}
      <p>{JSON.stringify(currentIngredients)}</p>
    </div>
  );
}
