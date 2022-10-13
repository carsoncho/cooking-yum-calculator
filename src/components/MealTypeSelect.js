import React from 'react';
import { useForm } from 'react-hook-form';
import mealTypeData from '../static/meal-types.json';
import FormTitle from './shared/FormTitle';

export default function MealTypeSelect(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    props.nextStep();
  }

  function getFormattedMealTypeString(item) {
    let preservationModifier =
      item.preservation < 0
        ? `${item.preservation} Preservation`
        : `+${item.preservation} Preservation`;
    return `${item.name} (${preservationModifier})`;
  }

  // @TODO: Add ability to select "other" and provide a textbox.
  return (
    <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
      <FormTitle title='MEAL TYPE' translation='食事の種類' />
      <button onClick={() => props.prevStep()}>Prev</button>
      {errors.mealType && <span>You must select a Meal type.</span>}
      <label htmlFor='meal-type'>Meal Type</label>
      <select
        name='meal-type'
        className='meal-type'
        {...register('mealType', {
          required: true,
          onChange: props.handleSetMealTypeSelection,
        })}
      >
        <option value=''>- Select -</option>
        {mealTypeData.map((item) => (
          <option key={item._id} value={item._id}>
            {getFormattedMealTypeString(item)}
          </option>
        ))}
      </select>
      <p>
        Select how this meal will be prepared. This selection will affect how
        well preserved your meal will be
      </p>
      <input type='submit' value='Next' />
    </form>
  );
}
