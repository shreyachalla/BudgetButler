import React from "react";
import Grocery from "./Grocery";


export default function GroceryList({ groceryData, productData }) {
  console.log(groceryData);

  return (
    <main>
      <section className="nutrients">
        <h1>Macros</h1>
        <ul>
          {groceryData.map((nutrition) => (
            <section>
              <ul>
                <h5>{nutrition.name}</h5>
                <li>
                  Amount: {nutrition.amount} {nutrition.unit}
                </li>
                <li>
                  Percent of Daily Needs: {nutrition.percentOfDailyNeeds} %
                </li>
              </ul>
            </section>
          ))}
        </ul>
      </section>

      <section className="groceries">
        <h1>titles</h1>
        <ul>
            {productData.map((titles) => (
                <h3>{titles}</h3>
            ))}
        </ul>
      </section>
    </main>
  );
}
