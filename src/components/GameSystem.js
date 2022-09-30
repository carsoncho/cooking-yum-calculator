import React from "react";
import GameSystems from "../static/gamesystems.json";

export default function GameSystem(props) {
  const gameSystems = GameSystems;
  return (
    <div>
      <label htmlFor="game-system-selection">Select the game system</label>
      <select
        name="game-system-selection"
        className="game-system"
        onChange={props.handleSystemSelection}
      >
        <option value="">- Select -</option>
        {gameSystems.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
