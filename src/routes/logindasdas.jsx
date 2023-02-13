import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';


function Login() {


 
  const [email2, setEmail2] = useState("");
  const [password2, setPassword2] = useState("");
  const [token, setToken] = useState();
  const [error, setError] = useState(null);
  //const navigate = useNavigate();

  const API_URL = '/api/auth/login';


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email2 || !password2) throw new Error('both fields required');
      const response = await axios.post('http://localhost:4500/api/auth/login',
      {
        headers:{
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                },
        body:{
          email: email2,
          password: password2
        }
      });
      if(response) setToken(response.token)
      localStorage.setItem('token', token);
      window.location('/');
      //navigate('/');
    } catch (error) {
      setError(error);
    }
  }



return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email2}
          onChange={(e) => setEmail2(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>

  );
}

export default Login;






  // const loginGetToken = async () => {
  //   try {
  //     const response = await fetch(API_URL, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': '*'
  //       },
  //       body: {
  //         email: email,
  //         password: password
  //       }
  //     }).then((res) => res.json());
  //     setToken(response.token);
  //   } catch (err) {
  //     console.error(err, "error en loginGetToken");
  //   }
  // }