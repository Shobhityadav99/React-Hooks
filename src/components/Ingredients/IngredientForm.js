import React , { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  // const [inputState,setInputState] = useState({title: '',amount: ''});
  const [enteredTitle, setenteredTitle] = useState('');
  const [enteredAmount, setenteredAmount]= useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({title: enteredTitle,amount: enteredAmount});
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input 
            type="text" 
            id="title" 
            value={enteredTitle} 
            onChange={event => {
              setenteredTitle(event.target.value);}}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
            type="number" 
            id="amount" 
            value={enteredAmount}
            onChange={event => {
              setenteredAmount(event.target.value);}} />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
