import React from 'react';
import { useForm } from 'react-hook-form';
import cookingStationData from '../static/cooking-stations.json';
import FormTitle from './shared/FormTitle';

export default function CookingStationSelect(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    props.nextStep();
  }

  // @TODO: Add ability to select "other" and provide a textbox.
  return (
    <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
      <FormTitle title='COOKING STATION' translation='クッキングステーション' />
      <button onClick={() => props.prevStep()}>Prev</button>
      {errors.cookingStation && <span>You must select a cooking station.</span>}
      <label htmlFor='cooking-station'>Cooking Station</label>
      <select
        name='cooking-station'
        className='cooking-station'
        {...register('cookingStation', {
          required: true,
          onChange: props.handleCookingStationSelection,
        })}
      >
        <option value=''>- Select -</option>
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
      <input type='submit' value='Next' />
    </form>
  );
}
