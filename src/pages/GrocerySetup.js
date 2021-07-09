import React, { useState } from "react";
import GroceryList from "./GroceryList";
import "./GrocerySetup.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function GrocerySetup() {
  const [groceryProductData, setGroceryProductData] = useState([]);
  function getGroceryData() {
    let groceryItem = document.getElementById("search").value;
    const api1 = `https://api.spoonacular.com/food/products/search?apiKey=${key}&query=${groceryItem}`;
    fetch(api1)
      .then((response) => response.json())
      .then((data) => {
        setGroceryProductData(data.products);
      })
      .catch(() => {
        console.log("#1 get request error");
      });
  }

  return (
    <div className="grocerySetup">
      <section className="controls">
        <input
          id="search"
          type="text"
          placeholder="Search for Grocery"
          autoComplete="off"
        />
      </section>
      <Button variant="dark" onClick={getGroceryData}>
        Get Grocery Items
      </Button>{" "}
      {groceryProductData && (
        <GroceryList groceryProductData={groceryProductData} />
      )}
    </div>
  );
}
//let key = "93e7f0f4d3734c60b15ffed266b08712";
//let key = "3bb00853f82b44448c83e27b311c0895"
// let key = "db6a8a86cd074a9f817d81be645b4a11";
let key = "e75f6bb427c24032b4b6e5b815c65b2c"

export default GrocerySetup;
