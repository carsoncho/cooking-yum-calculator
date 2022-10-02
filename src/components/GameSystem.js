import React from "react";
import { useForm } from "react-hook-form";
import GameSystemsData from "../static/gamesystems.json";

export default function GameSystem(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const gameSystems = GameSystemsData;

  /**
   * Submission handler for the game system selection form.
   *
   * @param {*} data
   *   The form data
   */
  function onSubmit(data) {
    props.nextStep();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Game System</h2>
      {errors.gameSystemSelect && <span>You must select a game system.</span>}
      <label htmlFor="game-system-selection">Select the game system</label>
      <select
        name="game-system-selection"
        className="game-system"
        value={props.systemSelection}
        {...register("gameSystemSelect", {
          required: true,
          onChange: props.handleSystemSelection,
        })}
      >
        <option value="">- Select -</option>
        {gameSystems.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      <input type="submit" value="Next" />
    </form>
  );
}
