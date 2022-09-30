import React from "react";
import cookingStationData from "../static/cooking-stations.json";

export default function CookingStationSelect(props) {
  // @TODO: Add ability to select "other" and provide a textbox.
  return (
    <div>
      <label htmlFor="cooking-station">Cooking Station</label>
      <select
        name="cooking-station"
        className="cooking-station"
        onChange={props.handleCookingStationSelection}
      >
        <option value="">- Select -</option>
        {cookingStationData.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name} ({item.bonus < 0 ? item.bonus : `+${item.bonus}`})
          </option>
        ))}
      </select>
      <p>
        Select where you'll be cooking this meal. This selection will add a
        bonus to each of your <b>Meal Stage</b> rolls.
      </p>
    </div>
  );
}
