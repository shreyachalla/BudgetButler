import React, { useEffect, useState } from 'react';
import {db, firebase} from "../firebase";


const Profile = () =>{
    const [blogs,setBlogs]=useState([])

    useEffect(() => {
        fetchBlogs();
      }, [])

    const fetchBlogs=async()=>{
        // const response=db.collection('users').doc("rxTB9VY2woYD7C4kRAyb");
        const currentUser = firebase.auth().currentUser;  
        const response=db.collection('users').doc(currentUser.uid);
        const data=await response.get();
        setBlogs([...blogs,data.data()])
    }
    return(
        <div>
           <h2>User Information</h2>

           {
        blogs && blogs.map(blog=>{
          return(
            <div className="blog-container">
              <h4>{blog.name}</h4>
              <h4>{blog.height}</h4>
              <h4>{blog.username}</h4>
              <h4>{blog.weight}</h4>
              <p>{blog.email}</p>
            </div>
          )
        })
      }
        
        </div>
    );
}




export default Profile;