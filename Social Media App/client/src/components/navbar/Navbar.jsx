import "./navbar.css"
import {Search, Person, Chat, Notifications} from "@material-ui/icons"
import { Link } from "react-router-dom";
import { AuthContext } from '../../components/context/AuthContext';
import { useContext } from "react";
export default function Navbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user} = useContext(AuthContext);
  return (
    
        <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to = "/" style={{textDecoration:"none" }}>
            <span className="logo">SayWhatsz</span> 
          </Link>
        </div>

        <div className="topbarCenter">
          <div className="searchBar">
            <Search className="searchIcon"/>
            <input placeholder="search for anything" className="searchInput" />
          </div>
        </div>

        <div className="topbarRight">
        <div className="topbarLinks">
              <span className="topbarLinks">Homepage</span>
              <span className="topbarLinks">Timeline</span>
            </div>
            <div className="topbarIcons">
            <div className="topbarIconItem">
                <Person/>
                <span className="topbarIconBadge">1</span>
              </div>
              <div className="topbarIconItem">
                <Chat/>
                <span className="topbarIconBadge">1</span>
              </div>
              <div className="topbarIconItem">
                <Notifications/>
                <span className="topbarIconBadge">1</span>
              </div>
             </div>
             <img src={user.profilePicture?  PF + user.profilePicture : PF+"user.png"} className="topbarImg"></img>
          
        </div>
            
        </div>
    )
}
