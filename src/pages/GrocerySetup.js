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

  const [groceryData, setGroceryData] = useState(null)

  function getGroceryData() {
    let ids = {}
    let groceryItem = document.getElementById('search').value
    const api1 = `https://api.spoonacular.com/food/products/search?apiKey=${key}&query=${groceryItem}`
    fetch(
      api1
    )
    .then((response) => response.json())
    .then((data) => {
      var ids = data.products.map(obj => obj.id);
      var firstID = ids[0]
      let groceryInfo = displayGroceryData(firstID)
      console.log(groceryInfo)
    })
    .catch(() => {
      console.log("error")
    });
  }
  
  function displayGroceryData(firstID) {
    const api2 = `https://api.spoonacular.com/food/products/${firstID}?apiKey=${key}` 
    fetch (
      api2
    )
    .then((response) => response.json())
    .then((data) => {
      let macros = data.nutrition.nutrients.map(obj => obj);
      console.log(macros)
      return macros
    })
    .catch(() => {
      console.log("error")
    });

  }

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
      onClick={getGroceryData}
      Get Grocery Items>
      </button> 
    </div>
  );
}
    let key = 'db6a8a86cd074a9f817d81be645b4a11'
    //let key = '93e7f0f4d3734c60b15ffed266b08712'

export default GrocerySetup;
