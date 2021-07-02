import React from "react";
import {db} from "../firebase.js";


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
    db.collection("users").add({name: document.getElementById("name").value});
    db.collection("users").add({age: document.getElementById("age").value});
    db.collection("users").add({height: document.getElementById("height").value});
    db.collection("users").add({weight: document.getElementById("weight").value});
    db.collection("users").add({sex1: document.getElementById("sex1").value});
    db.collection("users").add({sex2: document.getElementById("sex2").value});
    };
  
    return (
      <div className="container">
        <h1>Example</h1>
        <form onSubmit={saveAnswer}>
          <input type="text" id="name" placeholder="Type Name here..."></input>
          <input type="number" id="age" placeholder="Type Age here..."></input> 
          <input type="number" id="height" placeholder="Type Height here..."></input>
          <input type="number" id="weight" placeholder="Type Weight here..."></input> 
          <input type="checkbox" id="sex1" checked="true" value="Female"/>
          <label for="sex1"> Female </label>
          <input type="checkbox" id="sex2" checked="false" value="Male"/>
          <label for="sex2">Male</label>
          <button>Submit to Firebase</button>

        </form>
      </div>
    );
  };
  

export default Profile;