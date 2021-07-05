import react, { useEffect, useState } from 'react';
import {db} from "../firebase";


// right now this displays all user information but we want to connect it specific user information 
// and display it -- connect to authentication
export default function Profile(){
    const[loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPostsFromFirebase = [];
        const subscriber = db.collection("users").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc => {
                getPostsFromFirebase.push({...doc.data(), key: doc.id,
                });
               
            }));
            setPosts(getPostsFromFirebase);
            setLoading(false);
        });

        return() => subscriber();

    }, []);

    if(loading){
        return <h1>loading firebase data</h1>
    }
    
    


    return(
        <div>

            <h1>title</h1>
            
            {posts.length > 0 ? (
                posts.map((post) => <div key={post.key}>{post.name}</div>)
            ): (
                <h1>No profiles yet</h1>
            )}
        </div>
    );
}