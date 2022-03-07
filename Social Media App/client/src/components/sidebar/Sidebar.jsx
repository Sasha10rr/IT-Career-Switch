import "./sidebar.css"
import {Home, TrendingUp, Equalizer,History} from "@material-ui/icons"
export default function Sidebar() {
  return <div className="sidebar">
    <div className="sidebarWraper"> 
    <ul className="sidebarList">
    <li className="sidebarListItem">
        <Home className="sidebarIcon"/>
        <span className="sidebarListItemText">Home</span>
      </li>
      <li className="sidebarListItem">
        <TrendingUp className="sidebarIcon"/>
        <span className="sidebarListItemText">Trending</span>
      </li>
      <li className="sidebarListItem">
        <Equalizer className="sidebarIcon"/>
        <span className="sidebarListItemText">Top</span>
      </li>
      <li className="sidebarListItem">
        <History className="sidebarIcon"/>
        <span className="sidebarListItemText">Fresh</span>
      </li>
      
    </ul>
       <hr className="sidebarHr" />
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
    
    </div>;
}
