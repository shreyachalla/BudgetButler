import React, {useState, useEffect} from 'react';

function Grocery({grocery}) {

  const [imageUrl, setImageUrl] = useState("")

  // useEffect(() => {
  //   let key = 'db6a8a86cd074a9f817d81be645b4a11'
  //   let api = `https://api.spoonacular.com/recipes/${grocery.id}/information?apiKey=${key}&includeNutrition=false`
  //   fetch(
  //     api
  //     ).then((response) => response.json())
  //     .then((data) => {
  //       setImageUrl(data.image)
  //     })
  //     .catch(() => {
  //       console.log("error")
  //     })
  // }, [grocery.id])
  return (
    <article>
      {/* <h1>{grocery.title}</h1>
      <img src={imageUrl} alt ="grocery"/> */}
    </article>
  );
}

export default Grocery;
