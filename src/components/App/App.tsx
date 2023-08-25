import './App.css';
import { Outlet, Link } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react'
import UserInterface from '../../interfaces/UserInterface';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../Contexts/UserContext';
import logo from '../../assets/logo.png'

function App() {

    const user = useUser();
    useEffect(() => {
        console.log("user useEffect APP", user);
    }, [user]);

    /*
        <a href="https://fr.freepik.com/vecteurs-libre/logo-pieuvre-degrade-colore_49695230.htm#page=3&query=octopus%20logo&position=12&from_view=search&track=ais">Image de Gbob</a> sur Freepik*/
    return (

        <div className="App">


            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed">

                    <Link className="navbar-brand" to="/">
                        <img id="logo" src={logo} height="50" alt="Memos Puces" loading="lazy" />
                    </Link >

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto ">
                            <li className="nav-item"><NavLink className="nav-link" to="/" >Home</NavLink ></li>
                            <li className="nav-item"><NavLink className="nav-link" to="/Terms" >Thématiques</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="/Memos" >Mes memos</NavLink ></li>

                        </ul>
                    </div>

                    <div id="logout-container" className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto ms-auto">
                            {user.user !== null && user.user !== undefined ? (<li className="nav-item"><Link className="nav-link" to="/logout">Deconnexion</Link></li>) : null}
                        </ul>
                    </div>

                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>

    );
}

export default App;