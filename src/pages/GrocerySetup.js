import React, {useState} from 'react';
import GroceryList from './GroceryList'
import './GrocerySetup.css'
function GrocerySetup() {

    // fetchItemsJson().then(items => {
  //   let ids = items.products.map(obj => obj.id);
  //   console.log(ids)
  //   // setGroceryData(data)
  //   setGroceryID(ids)
  // });


  async function getGroceryData() {
    let groceryID = document.getElementById('search').value
    let api = `https://api.spoonacular.com/food/products/search?apiKey=${key}&query=${groceryID}`
    const response = await fetch(api)
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const items = await response.json();
    let ids = items.products.map(obj => obj.id);
    return ids
  }

  let ids = {}
  console.log(document.getElementById('search'));
  return (
    <div className='grocerySetup'>
      <section className="controls">
          <input id="search"
          type="text"
          placeholder="Search for Grocery"
          autoComplete="off"
         />
      </section>
      <button className="btn" 
      onClick={() => ids = getGroceryData()}
      Get Grocery Items>
      </button> 
        {
          <li key={ids}></li>
        }
    </div>
  );
}
    // let key = 'db6a8a86cd074a9f817d81be645b4a11'
    // let api = `https://api.spoonacular.com/food/products/search?apiKey=${key}&query=${groceryData}`
    let key = '93e7f0f4d3734c60b15ffed266b08712'

export default GrocerySetup;
