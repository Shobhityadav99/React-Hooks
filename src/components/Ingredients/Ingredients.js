import React, { useState , useEffect , useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    fetch('https://react-hooks-9b70d-default-rtdb.firebaseio.com/ingredients.json')
    .then(response => response.json())
    .then(responseData => {
      const loadedIngredients = [];
      for(const key in responseData) {
        loadedIngredients.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount
        })
      }
      setUserIngredients(loadedIngredients);
    });  
  },[])
  const addIngredientHandler = ingredient => {
    setisLoading(true);
    fetch('https://react-hooks-9b70d-default-rtdb.firebaseio.com/ingredients.json',{
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json'}
    }).then(response => {
      setisLoading(false);
      return response.json();
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        { id: responseData.name, ...ingredient }
      ]);
    }).catch(error => {
      setError(error.message);
    });
  };

  const filterIngredientsHandler = useCallback(filterIngredients => {
    setUserIngredients(filterIngredients);
  },[]);

  const removeIngredientHandler = ingredientId => {
    setisLoading(true);
    fetch(`https://react-hooks-9b70d-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,{
      method: 'DELETE',
    }).then(response => {
      setisLoading(false);
      setUserIngredients(prevIngredients =>
        prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      );
    })
  };

  const clearerror = ()=> {
    setError(null);
    setisLoading(false);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearerror}>{error}</ErrorModal>}
      <IngredientForm 
      onAddIngredient={addIngredientHandler} 
      loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filterIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
