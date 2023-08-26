import { useEffect, useRef, useState } from "react";
import TermInterface from "../../interfaces/TermsInterface";
import TermData from "../../services/TermData";
import { PencilFill } from 'react-bootstrap-icons';
import { TrashFill } from 'react-bootstrap-icons';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { useTerm } from "../../Contexts/TermContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Contexts/UserContext";
/**
 * Terms
 * La thématique d'une question
 * @param props 
 * @returns JSX
 */
const Terms = (props: any) => {

    // INITS
    const [add_form, setAddForm] = useState<boolean>(false);
    const [edit_form, setEditForm] = useState<boolean>(false);
    const [edited_term, setEditedTerm] = useState<TermInterface | null>(null);

    // TERM Current
    const { curTerm } = useTerm();
    const { updateCurTerm } = useTerm();

    const inputAddTerm = useRef<HTMLInputElement>(null);
    const inputEditTerm = useRef<HTMLInputElement>(null);


    useEffect(() => {
    }, [add_form, edit_form, curTerm]);


    // ADD Term
    async function handleClickAddTerm(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        if (inputAddTerm.current) {
            const newTermName = inputAddTerm.current.value;
            inputAddTerm.current.value = "";
            inputAddTerm.current.focus();
            const res = await TermData.addTerm(newTermName);
            if (res === true) {
                props.onchangeTerm();
            } else {
                alert("Erreur à la création de la thématique");
            } //TODO: gestion erreur
        }
    }


    // DELETE Term
    async function handleClickRemoveTerm(id: number) {
        const res = await TermData.removeTerm(id);
        if (res === true) {
            props.onchangeTerm();
        } else {
            alert("Erreur à la suppression de la thématique");
        } //TODO: gestion erreur
    }


    // UPDATE Term
    async function handleClickEditTerm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();


        if (edited_term !== null && inputEditTerm.current) {


            const updTermName = inputEditTerm.current.value;
            edited_term.name = updTermName;

            inputEditTerm.current.value = "";
            inputEditTerm.current.focus();

            const res = await TermData.updateTerm(edited_term);
            if (res === true) {

                setEditForm(false);
                setEditedTerm(null);
                props.onchangeTerm();

            } else {
                alert("Erreur à la modification de la thématique");
                console.log(`Erreur à la modification de la thématique`, res)
            } //TODO: gestion erreur


        } else {
            alert("Erreur modification term: non trouve ou null");
            console.log("Erreur modification term: non trouve ou null", edited_term);
        } //TODO: gestion erreur

    }


    // AFFICHAGE Form Add
    function handleClickShowAddFormTerm() {

        if (edit_form === true) {
            setEditForm(false);
        }

        const change_show = !add_form;
        setAddForm(change_show);
    }


    // AFFICHAGE Form Edit
    function handleClickShowEditFormTerm(term: TermInterface) {

        // Hide addForm
        if (add_form === true) {
            setAddForm(false);
        }

        // Hide/Show selon le term concerné par le click
        let change_show = false; // Si click sur le meme term 
        if (term !== null && ((edited_term === null) || edited_term !== term)) {
            change_show = true;
        }

        setEditForm(change_show);

        // Actualisation du term en edition
        if (change_show === true) {
            setEditedTerm(term);
        } else {
            setEditedTerm(null);
        }
    }


    // AFFICHAGE Current Term
    function handleClickChangeCurrTerm(term: TermInterface) {
        updateCurTerm(term);
        props.onChangeCurTerm(term);
    }


    // AFFICHAGE CSS
    function activedTermClass(term: TermInterface) {

        if (props.curTerm !== null && term.id === props.curTerm.id) {
            return "activated-term";
        }

        return "";
    }



    return (
        <div id="terms-container">

            <ul id="ul-terms-container">

                <li>
                    <button  className="btn " id='btn-terms-add' type="submit" onClick={() => handleClickShowAddFormTerm()}><PlusCircleFill className="icons-terms" /></button>
                </li>

                {props.terms.map((term: TermInterface) => (

                    <li className={activedTermClass(term) + " li-terms-btns"} key={term.id}>

                        <p className="btn-terms-title" onClick={() => handleClickChangeCurrTerm(term)}> {term.name} </p>

                        <div className="btn-terms-actions">
                            <button className="btn btn-terms" onClick={() => handleClickShowEditFormTerm(term)} ><PencilFill className="icons-terms" /></button>
                            <button className="btn btn-terms" onClick={() => handleClickRemoveTerm(term.id)} ><TrashFill className="icons-terms" /></button>
                        </div>

                    </li>

                ))}

            </ul>

            {add_form ? (
                <form className="form-terms" onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleClickAddTerm(event)}>

                    <input className="form-control w-auto ms-3" type="text" ref={inputAddTerm} placeholder=" Nouvelle thématique" />
                    <button type="submit" className="btn color-main-btn ">Ajouter!</button>

                </form>
            ) : null}


            {edit_form ? (
                <form className="form-terms" onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleClickEditTerm(event)}>

                    <input className="form-control w-auto ms-3"
                        type="text"
                        ref={inputEditTerm}
                        value={edited_term !== null ? edited_term.name : "error undefined"}
                        onChange={(event) => {
                            if (edited_term !== null) {
                                setEditedTerm({
                                    ...edited_term,
                                    name: event.target.value
                                });
                            }
                        }} />

                    <button type="submit" className="btn color-main-btn">Modifier!</button>
                </form>
            ) : null}



        </div>
    );
}

export default Terms;