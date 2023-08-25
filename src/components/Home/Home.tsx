import UserInterface from '../../interfaces/UserInterface';
import { useUser } from '../../Contexts/UserContext';
import UserData from '../../services/UserData';
import './Home.css';
import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {

    const inputLoginConnect = useRef<HTMLInputElement>(null);
    const inputPwdConnect = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const { user } = useUser();
    const { updateUser } = useUser();

    // Redirection si l'utilisateur est déjà connecté
    useEffect(() => {
        if (user !== null) {
            navigate("/lstTerms");
        }
    }, [user, navigate]);


    // Check authentification
    const handleClickConnect = async (event: React.FormEvent<HTMLFormElement>) => {

        if (inputLoginConnect.current && inputPwdConnect.current) {

            event.preventDefault();
            const infosConnect = [inputLoginConnect.current.value, inputPwdConnect.current.value];
            const userFind: UserInterface[] = await UserData.loadOneUser(infosConnect[0], infosConnect[1]);

            if (userFind !== null && userFind !== undefined && userFind.length !== 0) {

                inputLoginConnect.current.value = "";
                inputLoginConnect.current.focus();

                inputPwdConnect.current.value = "";
                inputPwdConnect.current.focus();

                updateUser(userFind[0]);


            } else {
                alert("Utilisateur non trouvé");//TODO : Affichage Error
            }
        }
    }


    return (
        <div id="home">
            <form onSubmit={(event) => { handleClickConnect(event); }}>

                <div className="form-group form-outline mb-4">
                    <input type="text" id="formLogin" className="form-control" ref={inputLoginConnect} placeholder="Login" />
                </div>

                <div className="form-group form-outline mb-4">
                    <input type="password" id="formPwd" className="form-control" ref={inputPwdConnect} placeholder="Mot de passe" />
                </div>

                <button type="submit" className="btn color-main-btn btn-block mb-4">Se Connecter</button>

            </form>
        </div>
    );


}

export default Home;