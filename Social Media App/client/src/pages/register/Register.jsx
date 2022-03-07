import axios from 'axios';
import React from 'react';
import { useRef } from 'react';
import "./register.css"
import { Link, useHistory } from 'react-router-dom';
export default function Login() {

    
const email =useRef();
const username = useRef();
const rePassword = useRef();
const password = useRef();
const history = useHistory()
const clickSubmit = async (e) =>{
    e.preventDefault();
    if(password.current.value !== rePassword.current.value){
        rePassword.current.setCustomValidity("Passwords don't match")
    }
    else{
        const user = {
            username:username.current.value,
            email:email.current.value, 
            password:password.current.value 
        };
        try{
            const res = await axios.post("/auth/register",user);
            history.push("/login")

        } catch (err){
            console.log(err);
        }
    }
   
}
    
  return (
        <div className="container">
            <div className="loginWrapper">
                <div className="leftContainer">
                    <span className="titleSocial">Social App</span>
                    <span className="descriptionSocial">Connect with friends and the world around you on Social App.</span>
                </div>

                <div className="rightContainer">
                    <form  onSubmit={clickSubmit} className="loginContainer">

                    <input 
                        placeholder='Enter your username' 
                        required 
                        className="inputField" 
                        ref={username}
                        type="text"
                    />
                    <input
                         placeholder="Enter your email"
                         required
                         className="inputField"
                         ref={email}
                         type="email"
                    />
                    <input 
                        placeholder="Enter your password"
                        required 
                        className="inputField"
                        type="password"
                        ref={password}
                     />
                    <input
                     placeholder="Re-enter your password"
                     className="inputField" 
                     type="password"
                     ref={rePassword}
                     />
                    <button  className="inputButton">Register</button> 
                    <hr />

                    <Link to="/login" className="">
                    <button className="inputButton21">Log Into Account</button>
                    </Link>
                    </form>
                </div>
            </div>
        </div>
  
    )
}
