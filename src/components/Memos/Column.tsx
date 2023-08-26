import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import CardInterface from "../../interfaces/CardInterface";
import CardData from "../../services/CardData";
import ModalChild from "../Modals/ModalChild";
import ModalRoot from "../Modals/ModalRoot";
import { PlusCircleFill } from "react-bootstrap-icons";

const Column = (props: any) => {

    const inputQstAdd = useRef<HTMLInputElement>(null);
    const inputAswAdd = useRef<HTMLInputElement>(null);
    const [modalShow, setModalShow] = useState<boolean>(false);

    useEffect(() => {
    }, [modalShow]);

    const handleClickShowAddModalCol = (setShowed: boolean) => {
        setModalShow(setShowed);
    };


    // ADD Card
    const handleClickAddCard = async (event: React.FormEvent<HTMLFormElement>, colId: number) => {

        if (inputQstAdd.current && inputAswAdd.current) {

            event.preventDefault();
            const infosCard = [inputQstAdd.current.value, inputAswAdd.current.value];
            const res: boolean = await CardData.addCard(infosCard[0], infosCard[1], colId, props.curTerm.id);

            if (res === true) {

                inputQstAdd.current.value = "";
                inputQstAdd.current.focus();

                inputAswAdd.current.value = "";
                inputAswAdd.current.focus();

                handleClickShowAddModalCol(false);
                props.onchangeTerm();

            } else {
                alert("Erreur à la création de la thématique");
            } //TODO: gestion Erreur

        }
    }


    return (

        <div className="memos-container-children ">

            {modalShow && (
                <ModalRoot isOpen={modalShow} onClose={() => handleClickShowAddModalCol(false)}>
                    <ModalChild
                        title="Créer une question"
                        placeholderQuestion="Question ?"
                        placeholderAnswer="Response !"
                        btnText="Ajouter ma carte"
                        col={props.col}
                        handleClickForm={(event: React.FormEvent<HTMLFormElement>) => { handleClickAddCard(event, props.col.id) }}
                        inputQst={inputQstAdd}
                        inputAsw={inputAswAdd}
                    ></ModalChild>
                </ModalRoot>
            )}


            <div className="memo-title-container">
                <button className="btn color-main-btn btn-columns" type="button" onClick={() => handleClickShowAddModalCol(true)}><PlusCircleFill className="icons-terms cards-icons" /></button>
                <h3>{props.col.label}</h3>
            </div>

            <div className="cards-container">
                {props.cards.map((card: CardInterface) => <Card
                    key={card.id}
                    col={props.col}
                    card={card}
                    terms={props.terms}
                    onchangeTerm={() => props.onchangeTerm()} />)}
            </div>

        </div>
    );
}

export default Column;


