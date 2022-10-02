import React from "react";

export default function Totals(props) {
  let skills = props.skills;
  let skillNames = Object.keys(skills);

  // Preparation phase stuff
  let prepPhaseSkill = determineHighestBonusSkill(skillNames[1], skillNames[2]);
  let prepPhaseTotal = getPhaseTotal(
    props.rolls.preparation,
    skills.cooking,
    skills[prepPhaseSkill]
  );
  let prepPhaseBonus = getSkillBonus(
    props.rolls.preparation,
    skills.cooking,
    skills[prepPhaseSkill]
  );

  // Cooking phase stuff
  let cookingPhaseSkill = determineHighestBonusSkill(
    skillNames[3],
    skillNames[4]
  );
  let cookingPhaseTotal = getPhaseTotal(
    props.rolls.cooking,
    skills.cooking,
    skills[cookingPhaseSkill]
  );
  let cookingPhaseBonus = getSkillBonus(
    props.rolls.cooking,
    skills.cooking,
    skills[cookingPhaseSkill]
  );

  // Presentation phase stuff
  let presPhaseSkill = determineHighestBonusSkill(skillNames[5], skillNames[6]);
  let presPhaseTotal = getPhaseTotal(
    props.rolls.presentation,
    skills.cooking,
    skills[presPhaseSkill]
  );
  let presPhaseBonus = getSkillBonus(
    props.rolls.presentation,
    skills.cooking,
    skills[presPhaseSkill]
  );

  // Final totals
  // @TODO: Add total "flavorings" bonus here
  let finalBonus = prepPhaseBonus + cookingPhaseBonus + presPhaseBonus;

  /**
   * Array of all ingredient names in the meal.
   *
   * @param {Array[string]} ingredientNames
   */
  function getMealAttributes(ingredientNames) {
    let mealAttributes = [];
    ingredientNames.map((name) => {
      let ingredient = props.getIngredientByName("sf", name);
      let attributes = props.getIngredientAttributes(ingredient);
      mealAttributes = [...attributes, ...mealAttributes];
    });

    // @TODO: Ensure stats are unique, ie can't have the same stat twice.
    return mealAttributes;
  }

  getMealAttributes(["Mollusk", "Annelid", "Fruit"]);

  /**
   * Determines which skill has the higher rank.
   *
   * @param {*} skillA
   * @param {*} skillB
   * @returns
   */
  function determineHighestBonusSkill(skillA, skillB) {
    // If the two skills have the same value just return the first one.
    if (skills[skillA] === skills[skillB]) {
      return skillA;
    }

    return skills[skillA] > skills[skillB] ? skillA : skillB;
  }

  /**
   *
   * @param {*} roll
   * @param {*} cookingSkillRanks
   * @param {*} phaseSkillRanks
   * @returns
   */
  function getPhaseTotal(roll, cookingSkillRanks, phaseSkillRanks) {
    return roll + cookingSkillRanks + phaseSkillRanks;
  }

  /**
   *
   * @param {integer} roll
   * @param {integer} cookingSkillRanks
   * @param {integer} phaseSkillRanks
   * @returns
   */
  function getSkillBonus(roll, cookingSkillRanks, phaseSkillRanks) {
    let totalRoll = roll + cookingSkillRanks + phaseSkillRanks;
    return props.determineBonus(totalRoll);
  }

  return (
    <div>
      <h2>Results</h2>
      {/* TODO: Turn these 3 sections into a "PhaseTotal" component */}
      <h3>Preparation Phase Total: {prepPhaseTotal}</h3>
      <h3>Preparation Phase Bonus: {prepPhaseBonus}</h3>
      <p>Derived from:</p>
      <ul>
        <li>Preparation Roll: {props.rolls.preparation}</li>
        <li>Cooking skill ranks: {skills.cooking}</li>
        <li>
          Highest phase skill ranks: {prepPhaseSkill} ({skills[prepPhaseSkill]})
        </li>
      </ul>
      <hr />
      <h3>Cooking Phase Total: {cookingPhaseTotal}</h3>
      <h3>Cooking Phase Bonus: {cookingPhaseBonus}</h3>
      <p>Derived from:</p>
      <ul>
        <li>Cooking Roll: {props.rolls.cooking}</li>
        <li>Cooking skill ranks: {skills.cooking}</li>
        <li>
          Highest phase skill ranks: {cookingPhaseSkill} (
          {skills[cookingPhaseSkill]})
        </li>
      </ul>
      <hr />
      <h3>Presentation Phase Total: {presPhaseTotal}</h3>
      <h3>Presentation Phase Bonus: {presPhaseBonus}</h3>
      <p>Derived from:</p>
      <ul>
        <li>Presentation Roll: {props.rolls.presentation}</li>
        <li>Presentation skill ranks: {skills.cooking}</li>
        <li>
          Highest phase skill ranks: {presPhaseSkill} ({skills[presPhaseSkill]})
        </li>
      </ul>
      <hr />
      <h2>Final Bonus:</h2>
      <ul>
        {getMealAttributes(props.currentIngredients).map((attr) => {
          return (
            <li>
              {props.attributeMap[attr]} +{finalBonus}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
