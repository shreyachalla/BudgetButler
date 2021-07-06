// import React from 'react';
// import Grocery from './Grocery'
// export default function GroceryList({groceryData}) {

//   const nutrients = groceryData.nutrients
//   console.log(groceryData)

//   return (
//     <main>
//         <section className="nutrients">
//             <h1>Macros</h1>
//             <ul>
//                 {/*Use toFixed to round decimal to nearest whole number*/}
//                 <li>Calories: {nutrients.calories.toFixed(0)}</li>
//                 <li>Carbohydrates: {nutrients.carbohydrates.toFixed(0)}</li>
//                 <li>Protein: {nutrients.protein.toFixed(0)}</li>
//                 <li>Fat: {nutrients.fat.toFixed(0)}</li>
//             </ul>
//         </section>
//         <section className="groceries">
//             {groceryData.meals.map((grocery) => {
//                 return <Grocery key={grocery.id} grocery={grocery} />
//             })}
//         </section>
//     </main>
//   );
// }
