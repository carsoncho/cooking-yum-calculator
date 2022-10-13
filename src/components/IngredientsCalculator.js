import React, { useState } from 'react';
import gameSystemData from '../static/gamesystems.json';
import mealTypeData from '../static/meal-types.json';
import cookingStationData from '../static/cooking-stations.json';
import GameSystemSelect from './GameSystem';
import CharacterSkillsForm from './CharacterSkillsForm';
import MealTypeSelect from './MealTypeSelect';
import CookingStationSelect from './CookingStationSelect';
import IngredientsList from './IngredientsList';
import ReviewInfo from './ReviewInfo';
import ingredientsPf from '../static/ingredients-pf.json';
import RollInputsForm from './RollInputsForm';
import Totals from './Totals';

export default function IngredientsCalculator() {
  const [step, setStep] = useState(1);
  const [systemSelection, setSystemSelection] = useState('');
  const [currentSkills, setCurrentSkills] = useState({});
  const [selectedMealType, setMealType] = useState('');
  const [selectedCookingStation, setCookingStation] = useState('');
  const [currentIngredients, setCurrentIngredients] = useState([{}]);
  const [rollInputs, setRollInputs] = useState([{}]);

  // @TODO: Do something with.
  const attributeMap = {
    str: 'Strength',
    dex: 'Dexterity',
    con: 'Consitution',
    int: 'Intelligence',
    wis: 'Wisdom',
    chr: 'Charisma',
    hp: 'Health Points',
    sp: 'Stamina Points',
    fort: 'Fortitude',
    ref: 'Reflex',
    will: 'Will',
    rp: 'Resolve Points',
  };

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
    setCurrentSkills({ ...currentSkills, [skill]: Number(event.target.value) });
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
    setMealType(Number(event.target.value));
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
    setCookingStation(Number(event.target.value));
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

  function handleRollInput(event, rollType) {
    setRollInputs({ ...rollInputs, [rollType]: Number(event.target.value) });
  }

  /**
   * Returns a game system by ID.
   *
   * @param {string} systemId
   *   The ID of the system to find.
   * @returns
   *   The found game system
   */
  function getGameSystem(systemId) {
    return gameSystemData.find((element) => {
      return element._id === systemId;
    });
  }

  /**
   * Returns the selected game system's skills by ID.
   *
   * @param {string} systemId
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
   *
   * @param {string} systemId
   * @returns
   */
  function getIngredientsData(systemId) {
    let ingredientsData = [];
    switch (systemId) {
      case 'dnd5e':
        console.log('Add DND5e data!');
        break;
      case 'pf':
      case 'sf':
        ingredientsData = ingredientsPf;
        break;
      default:
        break;
    }

    return ingredientsData;
  }

  /**
   * Returns a Ingredient object by name.
   *
   * @TODO: Refactor this and where it's used to not require systemId since it should be retrievable in state.
   *
   * @param {string} systemId
   *   The gamesystem ID.
   * @param {string} ingredientName
   * @returns
   */
  function getIngredientByName(systemId, ingredientName) {
    const ingredientsData = getIngredientsData(systemId);
    let ingredientsList = [];

    ingredientsData.forEach((group) => {
      group.ingredients.forEach((ingredient) => {
        ingredientsList.push(ingredient);
      });
    });

    return ingredientsList.find((ingredient) => {
      return ingredient.name === ingredientName;
    });
  }

  /**
   * Gets available attributes from Ingredient Object
   *
   * @param {Object} ingredient
   *
   * @returns
   *   The attributes that are true.
   */
  function getIngredientAttributes(ingredient) {
    let attributes = ingredient.attributes;
    return Object.keys(attributes).filter((element, key) => {
      return attributes[element] === true;
    });
  }

  /**
   *
   * @param {*} ingredient
   * @returns
   */
  function formatIngredientAttributes(ingredient) {
    let attributes = getIngredientAttributes(ingredient);
    return `${attributes[0]} + ${attributes[1]}`;
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
   *   The array of data to search against. NOTE: each element must include an '_id' property.
   * @returns
   *   The found element from the array.
   */
  function findElement(id, data) {
    let found = data.find((element) => {
      return element._id === id;
    });

    return found;
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
   *
   * @returns
   */
  function determineComponentByStep() {
    switch (step) {
      case 1:
        return (
          <GameSystemSelect
            nextStep={nextStep}
            systemSelection={systemSelection}
            handleSystemSelection={handleSystemSelection}
          />
        );
      case 2:
        return (
          isGameSystemSelected() && (
            <CharacterSkillsForm
              nextStep={nextStep}
              prevStep={prevStep}
              gameSystemSkills={getGameSystemSkills(systemSelection)}
              handleCurentSkillsInput={handleCurentSkillsInput}
            />
          )
        );
      case 3:
        return (
          <MealTypeSelect
            nextStep={nextStep}
            prevStep={prevStep}
            handleSetMealTypeSelection={handleSetMealTypeSelection}
          />
        );
      case 4:
        return (
          <CookingStationSelect
            nextStep={nextStep}
            prevStep={prevStep}
            handleCookingStationSelection={handleCookingStationSelection}
          />
        );
      case 5:
        return (
          <IngredientsList
            nextStep={nextStep}
            prevStep={prevStep}
            maxCount='3'
            gameSystem={systemSelection}
            getIngredientAttributes={getIngredientAttributes}
            formatIngredientAttributes={formatIngredientAttributes}
            ingredients={currentIngredients}
            handleIngredientSelection={handleIngredientSelection}
            handleAddIngredient={addIngredient}
            handleRemoveIngredient={removeIngredient}
          />
        );
      case 6:
        return (
          <ReviewInfo
            nextStep={nextStep}
            prevStep={prevStep}
            attributeMap={attributeMap}
            gameSystem={getGameSystem(systemSelection)}
            currentSkills={currentSkills}
            mealType={selectedMealType}
            getMealType={getMealType}
            cookingStation={selectedCookingStation}
            getCookingStation={getCookingStation}
            currentIngredients={currentIngredients}
            getIngredientByName={getIngredientByName}
            getIngredientAttributes={getIngredientAttributes}
            formatIngredientAttributes={formatIngredientAttributes}
          />
        );
      case 7:
        return (
          <RollInputsForm
            nextStep={nextStep}
            prevStep={prevStep}
            handleRollInput={handleRollInput}
          />
        );
      case 8:
        return (
          <Totals
            skills={currentSkills}
            rolls={rollInputs}
            attributeMap={attributeMap}
            determineBonus={determineBonus}
            currentIngredients={currentIngredients}
            getIngredientByName={getIngredientByName}
            getIngredientAttributes={getIngredientAttributes}
            formatIngredientAttributes={formatIngredientAttributes}
          />
        );
      default:
        break;
    }
  }

  return (
    <div className='ingredients-calculator'>{determineComponentByStep()}</div>
  );
}
