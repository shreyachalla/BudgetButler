import React from "react";
import {db} from "../firestore/config.js";


const Profile = () => {
    const saveAnswer = (event) => {
      event.preventDefault();
  
    //   const elementsArray = [...event.target.elements];
  
    // //   const formData = event;

    // //use state hooks instead -- in another video
    //   const formData = elementsArray.reduce((accumulator, currentValue) => {
    //     if (currentValue.id) {
    //       accumulator[currentValue.id] = currentValue.value;
    //     }
  
    //     return accumulator;
    //   }, {});
  
    //   db.collection("userInfo").add(formData);
    db.collection("userInfo").add({fname:"check 2"});
    };
  
    return (
      <div className="container">
        <h1>Example</h1>
        <form onSubmit={saveAnswer}>
          <input type="text" id="fname" placeholder="Type Name here..."></input>
          <button>Submit to Firebase</button>

        </form>
      </div>
    );
  };
  

export default Profile;
