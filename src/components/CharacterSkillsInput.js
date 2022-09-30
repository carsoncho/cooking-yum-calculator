import React from "react";

export default function CharacterSkillsInput(props) {
  return (
    <div className="character-skill">
      <label htmlFor={props.name}>{props.name}</label>
      <input
        onChange={(event) => {
          props.handleCurentSkillsInput(event, props._id);
        }}
        data-skill={props._id}
        placeholder="Enter modifier bonus"
        name={props.name}
        type="text"
      />
    </div>
  );
}
