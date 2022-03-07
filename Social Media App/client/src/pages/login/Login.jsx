import React from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { loginCall } from '../../components/apiCalls';
import { AuthContext } from '../../components/context/AuthContext';
import {CircularProgress} from "@material-ui/core"
import "./login.css"
import { Link } from 'react-router-dom';

export default function Login() {
    const {user, isFetching, error, dispatch} = useContext(AuthContext)
    const email =useRef();
    const password = useRef();
    const handleSubmit = (e) =>{
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value}, dispatch);
        console.log(email.current.value,password.current.value)
    }

    console.log(user)
  return (
        <div className="container">
            <div className="loginWrapper">
                <div className="leftContainer">
                    <span className="titleSocial">Social App</span>
                    <span className="descriptionSocial">Connect with friends and the world around you on Social App.</span>
                </div>

                <div className="rightContainer">
                    <form className="loginContainer" onSubmit={handleSubmit}>

                    <input
                        placeholder='enter your email'
                        type="email" 
                        required 
                        ref={email}
                        className="inputField" 
                    />
                    <input 
                        placeholder="enter your password" 
                        type="password" 
                        required 
                        ref={password}  
                        minLength="6"
                        className="inputField" 
                    />
                    <button className="inputButton">{isFetching ? <CircularProgress color='white' size='35px' /> : "Log In"}</button>
                    <span className="forgotPass">Forgot password?</span>
                    <hr />
                    <Link to="/register">
                    <button className="inputButton21">Create New Account</button>
                    </Link>
                    </form>
                </div>
            </div>
        </div>
  
    )
}
