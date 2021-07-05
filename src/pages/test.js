import React from 'react';
import {db} from "../firebase.js";
import { useState, useEffect } from 'react';


const Test = () =>{
    const [blogs,setBlogs]=useState([])

    useEffect(() => {
        fetchBlogs();
      }, [])

    const fetchBlogs=async()=>{
        const response=db.collection('users').doc("rxTB9VY2woYD7C4kRAyb");
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
              <p>{blog.email}</p>
            </div>
          )
        })
      }
        
        </div>
    );
}





export default Test;
