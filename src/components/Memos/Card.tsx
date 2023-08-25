import { useEffect, useRef, useState } from "react";
import { GearFill, PencilFill, TrashFill } from "react-bootstrap-icons";
import CardData from "../../services/CardData";
import CardInterface from "../../interfaces/CardInterface";
import ModalChild from "../Modals/ModalChild";
import ModalRoot from "../Modals/ModalRoot";

const Card = (props: any) => {

	const inputQstEdit = useRef<HTMLInputElement>(null);
	const inputAswEdit = useRef<HTMLInputElement>(null);

	const [isTextVisible, setTextVisible] = useState(false);
	const [isActionsVisible, setActionsVisible] = useState(false);
	const [modalShow, setModalShow] = useState<boolean>(false);

	useEffect(() => {
	}, [modalShow]);


	// AFFICHAGE Modal Edit
	const handleClickShowEditModalCard = (setShowed: boolean) => {
		setModalShow(setShowed);
	};


	// AFFICHAGE Reponse
	const toggleAnswer = () => {
		setTextVisible(!isTextVisible);
	};


	// AFFICHAGE Buttons d'action
	const toggleActions = () => {
		setActionsVisible(!isActionsVisible);
	}


	// DELETE Card
	async function handleClickRemoveCard(id: number) {
		const res = await CardData.removeCard(id);
		if (res === true) {
			props.onchangeTerm();
		} else {
			alert("Erreur à la suppression de la thématique");
		} //TODO: gestion erreur
	}


	// UPDATE Card
	async function handleClickEditCard(event: React.FormEvent<HTMLFormElement>, idCol: number, oldCard: CardInterface) {
		console.log(`handleClickEditCard`)
		event.preventDefault();


		if (inputQstEdit.current && inputAswEdit.current && oldCard != null) {


			const updCard: CardInterface = oldCard;
			updCard.question = inputQstEdit.current.value;
			updCard.answer = inputAswEdit.current.value;
			updCard.column = idCol;
console.log(`col`, idCol)
console.log(`card new`, updCard)

			const res = await CardData.updateCard(updCard);
			if (res === true) {

				inputQstEdit.current.value = "";
				inputQstEdit.current.focus();

				inputAswEdit.current.value = "";
				inputAswEdit.current.focus();

				handleClickShowEditModalCard(false);
				props.onchangeTerm();

			} else {
				alert("Erreur à la modification de la carte");
				console.log(`Erreur à la modification de la carte`, res)
			} //TODO: gestion erreur


		} else {
			alert("Erreur modification card: non trouve ou null");
			console.log("Erreur modification carte: non trouve ou null", oldCard);
			console.log("inputQstEdit", inputQstEdit);
			console.log("inputAswEdit", inputAswEdit);
		} //TODO: gestion erreur

	}




	return (

		<div>
			{modalShow && (
				<ModalRoot isOpen={modalShow} onClose={() => handleClickShowEditModalCard(false)}>
					<ModalChild
						title="Modifier une question"
						placeholderQuestion=""
						placeholderAnswer=""
						valueQuestion={props.card.question}
						valueAnswer={props.card.answer}
						btnText="Modifier ma carte"
						col={props.col}
						handleClickForm={(event: React.FormEvent<HTMLFormElement>) => { handleClickEditCard(event, props.col.id, props.card) }}
						inputQst={inputQstEdit}
						inputAsw={inputAswEdit}
					></ModalChild>
				</ModalRoot>
			)}

			<div className="card">

				<div className="card-body">

					<h4 className="card-title" onClick={toggleAnswer}>{props.card.question}</h4>
					{isTextVisible ? (
						<div>
							<h5 className="card-text">{props.card.answer}</h5>
							<button onClick={toggleActions}><GearFill className="color-main-btn"></GearFill></button>
						</div>)
						: (null)}
				</div>

				{isActionsVisible ? (
					<div className="card-footer">
						<button className="btn btn-terms" onClick={() => handleClickShowEditModalCard(true)} ><PencilFill className="icons-terms" /></button>
						<button className="btn btn-terms" onClick={() => handleClickRemoveCard(props.card.id)} ><TrashFill className="icons-terms" /></button>
					</div>)
					: null}

			</div>

		</div>
	);
}

export default Card;