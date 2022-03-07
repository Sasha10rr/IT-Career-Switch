
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import React, { useContext } from "react";
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { AuthContext } from "./components/context/AuthContext";

function App() {
  const {user} = useContext(AuthContext);
  
  return (
    <Router> 
      
      <Switch>
          <Route exact path="/">
            { user? <Home /> : <Register/>}
          </Route>
          <Route path="/profile/:username">
            <Profile />
          </Route>
          <Route path="/login">
          { user? <Home /> : <Login />}
            
          </Route>
          <Route path="/register">
            <Register />
          </Route>
   
      </Switch>
    </Router>

    
 
  
  )
     
   
}

export default App;
