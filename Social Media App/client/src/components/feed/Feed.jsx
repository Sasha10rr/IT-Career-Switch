import React, { useContext } from 'react';
import "./feed.css"
import Share from '../shared components/Share'
import Post from '../post/Post';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios"
import { AuthContext } from '../context/AuthContext';
export default function Feed({username}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);
  console.log("ova dali e dobro ili ne", user._id);
  useEffect(()=>{
    const getPosts = async ()=>{
      console.log("res res res res", username)
      const res = username 

      ? await axios.get("/posts/profile/"+username)
      : await axios.get("/posts/timeline/"+user._id)
      setPosts(res.data);
      console.log("inside useeffect",res.data, PF); 
    };
    getPosts();
  },[username]);
  return( 
  <div className='feed'>
      <div className="feedWrapper">
       { (!username||username === user.username) &&<Share/>}
       
       
        {
          posts.map((p)=>{ 
            return <Post key={p._id} post = {p}/>
          })
        }
        
      </div>
      </div>
      
      );
}
