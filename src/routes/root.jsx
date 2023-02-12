import React from "react";
import { BrowserRouter, Outlet, Route, Routes, Link } from "react-router-dom"
import '../styles/root.css'
const sesion = localStorage.getItem('@user');

const Root = () => {
    return (
        <div>

            <div id="navbar-container" >

                <div id="container-title" className="container-fluid">
                    <a href="/error" className="navbar-brand">
                        <h1 id="title-h1"> Mandados APP </h1>
                    </a>
                </div>

                <div id="container-navbar">

                    <nav id="nav-bar"
                    className="navbar navbar-expand-sm " >

                        <div className="container-fluid">

                            <ul id="nav-ul" className="navbar-nav">

                                <li id="nav-li" className="nav-item ">
                                    <Link to={'/map'} className="btn btn-dark mwidth">Map</Link>
                                </li>

                                <li id="nav-li" className="nav-item ">
                                    <Link to={'/profile'} className="btn btn-dark mwidth">Profile</Link>
                                </li>

                            </ul>

                        </div>

                    </nav>

                </div>

            </div>

            <div id="content-container">
                <Outlet />
            </div>

        </div>
    );
};

export default Root;