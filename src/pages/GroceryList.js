import React from "react";
import Grocery from "./Grocery";
import "./GroceryList.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import "bootstrap/dist/css/bootstrap.min.css";

export default function GroceryList({ groceryData, productData }) {
  console.log(groceryData);

  const styles = {
    padding: {
      paddingTop: "5vh",
      paddingBottom: "5vh",
      paddingRight: "18vw",
      paddingLeft: "18vw",
    },
  };

  return (
    <main>
      <section className="groceries">
        <CardColumns style={styles.padding} className="even">
          {productData.map((titles) => (
            <Card bg="light" className="text-center p-4">
              <Card.Body>
                <Card.Text>{titles}</Card.Text>
                <Button variant="dark" size="lg">
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          ))}
        </CardColumns>
      </section>

      {/* <section className="nutrients">
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
      </section> */}
    </main>
  );
}
