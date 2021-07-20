import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
function Grocery({ macroData, price }) {
  console.log("I'm in Grocery.js", JSON.stringify(macroData));
  return (
    <>
      <Card.Body>
        <Card.Title variant={"dark"} className="text-center p-4">
          Price $ {price}
        </Card.Title>
        {macroData.map((nutrition) => (
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <h5>{nutrition.name}</h5>
            </ListGroupItem>
            <ListGroupItem>
              Amount: {nutrition.amount} {nutrition.unit}
            </ListGroupItem>
            <ListGroupItem>
              Percent of Daily Needs: {nutrition.percentOfDailyNeeds} %
            </ListGroupItem>
          </ListGroup>
        ))}
      </Card.Body>
    </>
  );
}

export default Grocery;
