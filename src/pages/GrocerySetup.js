import React, { useState } from "react";
import GroceryList from "./GroceryList";
import "./GrocerySetup.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function GrocerySetup() {
  var key = process.env.React_App_SPOONACULAR_KEY;
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
    <>
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
    </>
  );
}

export default GrocerySetup;
