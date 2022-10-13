import React from 'react';
import { useForm } from 'react-hook-form';
import FormTitle from './shared/FormTitle';

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
    <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
      <FormTitle title='ROLL THE DICE' translation='サイコロで決める' />
      <p>
        For each stage of the cooking process; preparation, cooking,
        presentation, roll a d20.
      </p>
      <button onClick={() => props.prevStep()}>Prev</button>
      <div className='roll-group'>
        {errors.preparation && <span>You must enter a value.</span>}
        <label>Preparation</label>
        <input
          type='text'
          placeholder='Roll d20 and enter here'
          {...register('preparation', {
            required: true,
            onChange: (event) => {
              props.handleRollInput(event, 'preparation');
            },
          })}
        />
      </div>
      <div className='roll-group'>
        {errors.coooking && <span>You must enter a value.</span>}
        <label>Cooking</label>
        <input
          type='text'
          placeholder='Roll d20 and enter here'
          {...register('coooking', {
            required: true,
            onChange: (event) => {
              props.handleRollInput(event, 'cooking');
            },
          })}
        />
      </div>
      <div className='roll-group'>
        {errors.presentation && <span>You must enter a value.</span>}
        <label>Presentation</label>
        <input
          type='text'
          placeholder='Roll d20 and enter here'
          {...register('presentation', {
            required: true,
            onChange: (event) => {
              props.handleRollInput(event, 'presentation');
            },
          })}
        />
      </div>
      <input type='submit' value='Calculate' />
    </form>
  );
}
