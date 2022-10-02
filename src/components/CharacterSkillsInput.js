import React from "react";

export default function CharacterSkillsInput(props) {
  return (
    <div className="character-skill">
      {props.errors[props._id] && (
        <span>You must provide a value for {props.name}.</span>
      )}
      <label htmlFor={props._id}>{props.name}</label>
      <input
        {...props.register(props._id, {
          required: true,
          minValue: 0,
          onChange: (e) => {
            props.handleCurentSkillsInput(e, props._id);
          },
        })}
        type="number"
        placeholder="Enter skill ranks"
        name={props._id}
      />
    </div>
  );
}
