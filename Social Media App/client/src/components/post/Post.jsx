import React from 'react';
import "./post.css"
import {MoreHoriz, ThumbUp, Comment, Share} from '@material-ui/icons'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import {format} from "timeago.js"
import { Link } from 'react-router-dom';
export default function Post({post}) {
    console.log("thispost")
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser] = useState({});
    useEffect(()=>{
        const fetchUser = async () =>{
            const res = await axios(`/users?userId=${post.userId}`);
            
    console.log("this username",user)
            setUser(res.data)
        }
        fetchUser()
    },[post.userId])
   const [like,setLike] = useState(post.likes.length);
   const [isLiked,setIsLiked] = useState(false)
   const [postButton,setPostButton] = useState("postButton");
   const likeHandler=() =>{
        setLike(isLiked? like-1:like+1)
        
        setPostButton(isLiked?"postButton":"blue")
        setIsLiked(!isLiked)
        
   }
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">  
            <Link to ={ `profile/${user.username}`}>             
                <img src={user.profilePicture|| PF+"user.png"} alt="" className="postImgUser" />
            </Link>
                <span className="postUser">{user.username}</span>
                <span className="timePosted">{format(post.createdAt)}</span>
                <MoreHoriz className='postMore'/>
            </div>
            <div className="postCenter">
                <span className="postDesc">{post.desc}</span>
                <img src={PF+post.img} alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <img src={PF+"/like.jpg"} alt="" className="imgLikesNum" />
                <span className="numLikes">{like}</span>
                <spam className="numComments">56 Comments</spam>
                <span className="numShares">23 Shares</span>
            </div>
            <hr className="postBottomHr" />
            <div className="postButtons">
                <button className={postButton} id="likeButton" onClick={likeHandler}><ThumbUp className='buttonIcon'/> Like</button>
                <button className='postButton' id="commentButton"><Comment className='buttonIcon'/> Comment</button>
                <button className='postButton' id="shareButton"><Share className='buttonIcon'/> Share</button>
            </div>
        </div>
    </div>
  )
}
