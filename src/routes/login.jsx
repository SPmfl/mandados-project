import axios from "axios";
import { useState } from "react";
import {Outlet, Route, Routes, Link } from "react-router-dom";

import '../styles/login.css';

function Login() {

    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    const [useridSignup, setUseridSignup] = useState(0);
    const [nameSignup, setNameSignup] = useState('');
    const [emailSignup, setEmailSignup] = useState('');
    const [passwordSignup, setPasswordSignup] = useState('');
    const [rolSignup, setRolSignup] = useState('');

    const [stateLogin, setStateLogin] = useState(false);

    const urlLogin = 'http://localhost:4500/api/auth/login';
    const handleLogin = (event) => {
        event.preventDefault();
        try {
            // axios.post(urlLogin, {
            //     headers:{
            //         'Content-Type':'application/json;charset=utf-8'
            //     },
            //     body: {
            //         email: emailLogin,
            //         password:  passwordLogin
            //     }
            // }).then( (response) =>{
            axios.post(urlLogin, {
                body: {
                    email: emailLogin,
                    password: passwordLogin
                }
            }).then((response) => {
                const data = response.data;
                console.log("data received");
                if ('x_access_token' in data) {
                    console.log("token received!");
                    localStorage.setItem('x_access_token', 
                    JSON.parse(response.data.token));
                    window.location('/app/welcome');
                }

            }).catch(console.error)
        } catch (error) {
            console.error(error);
        }


    }

    const urlSignup = 'http://localhost:4500/api/auth/signup';
    const handleSignup = (event) => {
        event.preventDefault();
        try {
            axios.post(urlSignup, {
                body: {
                    userid: useridSignup,
                    name: nameSignup,
                    roluser: rolSignup,
                    email: emailSignup,
                    password: passwordSignup
                }
            }).then((response) => {
                const data = response.data;
                console.log("data received from signup", data);
                if ('x_access_token' in data) {
                    console.log("token received!");
                    localStorage.setItem('x_access_token', 
                    JSON.parse(response.data.token));
                    window.location('/app/welcome');
                }

            }).catch(console.error)
        } catch (error) {

        }
    }

    return (
        <div id="container" >
            
            <div id="login" className=" form-basic" >
                <h1>LogIn</h1>
                <form onSubmit={handleLogin} className="centered form-basic">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder=""
                        onChange={(e) => setEmailLogin(e.target.value)}
                        className="form-control"
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder=""
                        onChange={(e) => setPasswordLogin(e.target.value)}
                        className="form-control"
                        required
                    />
                    <button type="submit"
                        className="btn btn-secondary button-submit">Login</button>
                </form>
            </div>

            <div id="signup" className=" form-basic" >
                <h1>SignUp</h1>
                <form onSubmit={handleSignup} className="centered form-basic">
                    <label htmlFor="userid">User ID</label>
                    <input
                        type="text"
                        placeholder=""
                        onChange={(e) => setUseridSignup(e.target.value)}
                        className="form-control"
                        required
                    />
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        placeholder=""
                        onChange={(e) => setNameSignup(e.target.value)}
                        className="form-control"
                        required
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder=""
                        onChange={(e) => setEmailSignup(e.target.value)}
                        className="form-control"
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder=""
                        onChange={(e) => setPasswordSignup(e.target.value)}
                        className="form-control"
                        required
                    />
                    <label htmlFor="rol">Role</label>
                    <input
                        type="text"
                        name="rol"
                        placeholder=""
                        onChange={(e) => setRolSignup(e.target.value)}
                        className="form-control"
                        required
                    />
                    <button type="submit"
                        className="btn btn-secondary button-submit">Login</button>
                </form>
            </div>
            
        </div>
    );
}

export default Login;