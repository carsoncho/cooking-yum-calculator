import React from "react";
import mealTypeData from "../static/meal-types.json";

export default function MealTypeSelect(props) {
  // @TODO: Add ability to select "other" and provide a textbox.
  return (
    <div>
      <label htmlFor="meal-type">Meal Type</label>
      <select
        name="meal-type"
        className="meal-type"
        onChange={props.handleSetMealTypeSelection}
      >
        <option value="">- Select -</option>
        {mealTypeData.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name} (
            {item.preservation < 0
              ? item.preservation + " Perservation"
              : `+${item.preservation} Preservation`}
            )
          </option>
        ))}
      </select>
      <p>
        Select how this meal will be prepared. This selection will affect how
        well preserved your meal will be
      </p>
    </div>
  );
}
