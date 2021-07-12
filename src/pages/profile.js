import React, { useEffect, useState } from 'react';
import {db, firebase} from "../firebase";
import { useHistory } from "react-router-dom";
import './Profile.css';
import { className } from 'postcss-selector-parser';

const Profile = () =>{
    const [blogs,setBlogs]=useState([])

    useEffect(() => {
        fetchBlogs();
      }, [])

    const fetchBlogs=async()=>{
        const currentUser = firebase.auth().currentUser;  
        const response=db.collection('users').doc(currentUser.uid);
        const data=await response.get();
        setBlogs([...blogs,data.data()])
    }
    const history = useHistory();
    const handleClick=()=>{
      history.push("/overview");

    }
    return(
        <div>
           {/* <h2>User Information</h2> */}
           <button onClick={handleClick} className="gtDashboard" type="button">Go To Dashboard</button>
           {
        blogs && blogs.map(blog=>{
          return(
            <div className="blog-container">
              <h4 className="userName">{blog.name}</h4>
              {/* <h4>{blog.height}</h4>
              <h4>{blog.username}</h4>
              <h4>{blog.weight}</h4>
              <h4>{blog.email}</h4>
              <h4>{blog.activityLevel}</h4> */}
              <div className="grid-container">
                <div className="healthInfo">
                  <section>Health Information</section>
                </div>
                <div className="dietaryRestrictions">
                  <section>Dietary Restrictions</section>
                  <p>{blog.weight}lbs.</p>
                  <p>{blog.height}</p>
                </div>

              </div>
            </div>
            
          )
          
        }
        
        )
      }
        
      
        </div>
    );
}




export default Profile;