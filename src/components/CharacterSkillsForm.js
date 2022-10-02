import React from "react";
import { useForm } from "react-hook-form";
import CharacterSkillsInput from "./CharacterSkillsInput";

export default function CharacterSkillsForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    props.nextStep();
  }

  return (
    <form className="character-skills" onSubmit={handleSubmit(onSubmit)}>
      <h2>Character Skills</h2>
      <button onClick={() => props.prevStep()}>Prev</button>
      {props.gameSystemSkills.map((element, index) => {
        return (
          <CharacterSkillsInput
            key={index}
            {...element}
            register={register}
            errors={errors}
            handleCurentSkillsInput={props.handleCurentSkillsInput}
          />
        );
      })}
      <input type="submit" value="Next" />
    </form>
  );
}
