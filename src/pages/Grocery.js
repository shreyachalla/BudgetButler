import React from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Grocery({ macroData, price }) {
  console.log("I'm in Grocery.js", JSON.stringify(macroData));

  return (
    <section className="nutrients">
      <Card.Body>
        <Card.Title variant={"dark"} className="text-center p-4">
          <h2>Macros</h2>
        </Card.Title>
        <Card.Title variant={"dark"} className="text-center p-4">
          $ {price}
        </Card.Title>
        {macroData.map((nutrition) => (
          <ul>
            <h5>{nutrition.name}</h5>
            <li>
              Amount: {nutrition.amount} {nutrition.unit}
            </li>
            <li>Percent of Daily Needs: {nutrition.percentOfDailyNeeds} %</li>
          </ul>
        ))}
      </Card.Body>
    </section>
  );
}

export default Grocery;
