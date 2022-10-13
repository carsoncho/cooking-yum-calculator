import React from 'react';
import { useForm } from 'react-hook-form';
import CharacterSkillsInput from './CharacterSkillsInput';
import FormTitle from './shared/FormTitle';

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
    <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
      <FormTitle title='CHARACTER SKILLS' translation='キャラクタースキル' />
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
      <input type='submit' value='Next' />
    </form>
  );
}
