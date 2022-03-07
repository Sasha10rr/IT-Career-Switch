import React from "react";
import "./profile.css"
import Share from "../../components/shared components/Share"
import Feed from "../../components/feed/Feed"
import Navbar from "../../components/navbar/Navbar"  ;
import {LocationCity, Person, Favorite,BorderColor,CameraAlt} from "@material-ui/icons"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../components/context/AuthContext';
export default function Profile() { 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; 
    const {user:userMain} = useContext(AuthContext);
    const username = useParams().username;
    const [user, setUser] = useState([]); 
    
    const [followers,setFollowers] = useState([user.followers]);
    useEffect(()=>{
      const fetchUser = async ()=>{
        const res = await axios.get("/users?username="+username).then(function (response) {
            console.log("responsitive",response)
            setFollowers(response.data.followers)
          })
        setUser(res.data); 
        
      };
      fetchUser();
    },[username]) 
    console.log('followers', user.followers)
    
    console.log("tukatuka",followers)
 return (
   <>
    <Navbar/>
    <div className="profileContainer">
        <div className="profileTop">
           
            <div className="coverContainer">
                
            <img src={PF+"/img1.jpg"} alt="" className="coverImg" />
            <BorderColor className="editCoverPicture"/>

            </div>
            
            <div className="infoContainer">
                <img src={PF+"/user.png"} alt="" className="profileImg" />
                
            <CameraAlt className="editProfilePicture"/>
                <span className="profileName">{username}</span>
                <span className="friendsNum">{followers.length} Followers</span>
                {username !== userMain.username && (
                    <button   className="editProfileButton">Follow</button>
                )}
            </div>
        </div>
        <div className="profileBottom">
            <div className="profileBottomWrapper">

                <div className="leftProfile">
                    <div className="bottominfoHolder">
                        
                    <span className="aboutBar">About</span>

                    <div className="wraperAbout"> 
                        <LocationCity className="aboutIcon"/>
                        <span className="locationText">City</span>
                    </div>

                    <div className="wraperAbout">
                        <Person className="aboutIcon"/>
                        <span className="personText">Friends</span>
                    </div>

                    <div className="wraperAbout">
                    <Favorite className="aboutIcon"/> 
                    <span className="relationshipText">Single</span>
                    </div>
                    
                    </div>

                    <div className="friendsList">

 
                        <ul className="sidebarFriendList">
                        <li className="sidebarFriend">
                            <img src="assets/img1.jpg" alt="" className="sibarFriendImg" />
                            <span className="sidebarFriendName">Jane Doe</span>
                        </li>
                        <li className="sidebarFriend">
                            <img src="assets/img1.jpg" alt="" className="sibarFriendImg" />
                            <span className="sidebarFriendName">Jane Doe</span>
                        </li>
                        <li className="sidebarFriend">
                            <img src="assets/img1.jpg" alt="" className="sibarFriendImg" />
                            <span className="sidebarFriendName">Jane Doe</span>
                        </li>
                        <li className="sidebarFriend">
                            <img src="assets/img1.jpg" alt="" className="sibarFriendImg" />
                            <span className="sidebarFriendName">Jane Doe</span>
                        </li>
                        <li className="sidebarFriend">
                            <img src="assets/img1.jpg" alt="" className="sibarFriendImg" />
                            <span className="sidebarFriendName">Jane Doe</span>
                        </li>
                        <li className="sidebarFriend">
                            <img src="assets/img1.jpg" alt="" className="sibarFriendImg" />
                            <span className="sidebarFriendName">Jane Doe</span>
                        </li>
                        <li className="sidebarFriend">
                            <img src="assets/img1.jpg" alt="" className="sibarFriendImg" />
                            <span className="sidebarFriendName">Jane Doe</span>
                        </li>
                        <li className="sidebarFriend">
                            <img src="assets/img1.jpg" alt="" className="sibarFriendImg" />
                            <span className="sidebarFriendName">Jane Doe</span>
                        </li>
                        <li className="sidebarFriend">
                            <img src="assets/img1.jpg" alt="" className="sibarFriendImg" />
                            <span className="sidebarFriendName">Jane Doe</span>
                        </li>
                        <li className="sidebarFriend">
                            <img src="assets/img1.jpg" alt="" className="sibarFriendImg" />
                            <span className="sidebarFriendName">Jane Doe</span>
                        </li>
                        <li className="sidebarFriend">
                            <img src="assets/img1.jpg" alt="" className="sibarFriendImg" />
                            <span className="sidebarFriendName">Jane Doe</span>
                        </li>
                        <li className="sidebarFriend">
                            <img src="assets/img1.jpg" alt="" className="sibarFriendImg" />
                            <span className="sidebarFriendName">Jane Doe</span>
                        </li>
                        <li className="sidebarFriend">
                            <img src="assets/img1.jpg" alt="" className="sibarFriendImg" />
                            <span className="sidebarFriendName">Jane Doe</span>
                        </li>
                        </ul>
                    </div> 
                </div>

                <div className="rightProfile"> 
                    <Feed username={username}/>
                </div>
            </div>
        </div>

        
    </div>
  
   </>
 )
}
