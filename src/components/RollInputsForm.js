import React from "react";
import { useForm } from "react-hook-form";

export default function RollInputsForm(props) {
  // @TODO: Add error messaging
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    props.nextStep();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Roll the dice</h2>
      <p>
        For each stage of the cooking process; preparation, cooking,
        presentation, roll a d20.
      </p>
      <button onClick={() => props.prevStep()}>Prev</button>
      <div className="roll-group">
        <label>Preparation</label>
        <input
          type="text"
          placeholder="Roll d20 and enter here"
          {...register("preparation", {
            required: true,
            onChange: (event) => {
              props.handleRollInput(event, "preparation");
            },
          })}
        />
      </div>
      <div className="roll-group">
        <label>Cooking</label>
        <input
          type="text"
          placeholder="Roll d20 and enter here"
          {...register("coooking", {
            required: true,
            onChange: (event) => {
              props.handleRollInput(event, "cooking");
            },
          })}
        />
      </div>
      <div className="roll-group">
        <label>Presentation</label>
        <input
          type="text"
          placeholder="Roll d20 and enter here"
          {...register("presentation", {
            required: true,
            onChange: (event) => {
              props.handleRollInput(event, "presentation");
            },
          })}
        />
      </div>
      <input type="submit" value="Calculate" />
    </form>
  );
}
