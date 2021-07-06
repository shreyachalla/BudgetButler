import React, {useState} from 'react';
import MealList from "./MealList";

function Groceries() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);
  
  function handleChange(e) {
    setCalories(e.target.value);


  }

  function getMealData() {
    fetch (
      `https://api.spoonacular.com/mealplanner/generate?apiKey=3bb00853f82b44448c83e27b311c0895&timeFrame=day&targetCalories=${calories}`
    )
    .then((response) => response.json())
    .then((data) => {
      setMealData(data);
      console.log(data);
    })
    .catch(() => {
        console.log("error");
    });

  }
 
  return (
    <div className='groceries'>
      <section className="controls"> 
        <input 
            type="number"
            placeholder="Calories (ex 2000)"
            onChange={handleChange} /> 
      </section>
      <button onClick={getMealData}>Get Daily Meal</button>
      {mealData && <MealList mealData={mealData}/>}
    </div>
  );
}

export default Groceries;
