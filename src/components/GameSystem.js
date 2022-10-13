import React from 'react';
import { useForm } from 'react-hook-form';
import GameSystemsData from '../static/gamesystems.json';
import FormTitle from './shared/FormTitle';

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
    <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
      <FormTitle translation='ゲームシステム' title='GAME SYSTEM' />
      <div className='form-content'>
        <label className='form-label' htmlFor='game-system-selection'>
          Select the game system:
        </label>
        <select
          name='game-system-selection'
          className='game-system'
          value={props.systemSelection}
          {...register('gameSystemSelect', {
            required: true,
            onChange: props.handleSystemSelection,
          })}
        >
          <option value=''>- Select -</option>
          {gameSystems.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        <input className='submit-form-button' type='submit' value='Next' />
      </div>
      {errors.gameSystemSelect && (
        <div className='error-container'>
          <p className='form-error'>You must select a game system.</p>
        </div>
      )}
    </form>
  );
}
