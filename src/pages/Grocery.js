import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
function Grocery({ macroData, price }) {
  console.log("I'm in Grocery.js", JSON.stringify(macroData));
  return (
    <Card.Body>
      <Card.Title variant={"dark"} className="text-center p-4">
        Price $ {price}
      </Card.Title>
      {macroData.map((nutrition) => (
        <>
          <h5>{nutrition.name}</h5>
          <Card.Text>
            Amount: {nutrition.amount} {nutrition.unit}
          </Card.Text>
          {/* Remove daily need since is calculated based on the user's profile separately */}
          {/* <h6>Percent of Daily Needs: {nutrition.percentOfDailyNeeds} %</h6> */}
        </>
      ))}
    </Card.Body>
  );
}

export default Grocery;
