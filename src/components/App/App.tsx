import './App.css';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useUser } from '../../Contexts/UserContext';
import logo from '../../assets/logo.png'
import { DoorClosedFill } from 'react-bootstrap-icons';
function App() {

    const user = useUser();

    const navigate = useNavigate();
    useEffect(() => {
    }, [user, navigate]);

    const handleClickLogout = () =>{
        user.setUser(null);
        navigate("/");
    }

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
                            {user.user !== null && user.user !== undefined ? (
                                <div id="nav-connected">
                                    <li className="nav-item"><NavLink className="nav-link" to="/lstTerms" >Thématiques</NavLink></li>
                                    <li className="nav-item"><NavLink className="nav-link" to="/Memos" >Mes memos</NavLink ></li>
                                </div>
                            ) : null}

                        </ul>
                    </div>

                    <div id="logout-container" className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto ms-auto">
                            {user.user !== null && user.user !== undefined ? (
                                <li className="nav-item" onClick={handleClickLogout}><Link className="nav-link" to="/logout"><DoorClosedFill id="icon-logout"></DoorClosedFill></Link></li>
                            ) : null}
                        </ul>
                    </div>

                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            <footer className="bg-dark text-center text-white">

                <div id="footer-credits-container" className="text-center p-3">
                <div><a className="link" href="https://github.com/Elshindr">Coded by: </a>Elshindr</div>
                    <div> <a className="link"href="https://fr.freepik.com/vecteurs-libre/logo-pieuvre-degrade-colore_49695230.htm">Logo By: </a> Gbob (Freepik)</div>
                </div>

            </footer>
        </div>

    );
}

export default App;