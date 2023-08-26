import { useEffect, useRef, useState } from "react";
import { CaretLeftFill, CaretRightFill, GearFill, PencilFill, TrashFill } from "react-bootstrap-icons";
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

		event.preventDefault();

		if (inputQstEdit.current && inputAswEdit.current && oldCard != null) {

			const updCard: CardInterface = oldCard;
			updCard.question = inputQstEdit.current.value;
			updCard.answer = inputAswEdit.current.value;
			updCard.column = idCol;

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
		} //TODO: gestion erreur

	}

	async function handleClickArrow(newColId: number, oldCard: CardInterface) {
		const updCard: CardInterface = oldCard;
		updCard.question = oldCard.question;
		updCard.answer = oldCard.answer
		updCard.column = newColId;

		const res = await CardData.updateCard(updCard);
		if (res === true) {
			props.onchangeTerm();

		} else {
			alert("Erreur à la modification de colonne de la carte");
			console.log(`Erreur à la modification de colonne de la carte`, res)
		} //TODO: gestion erreur

	}

	// AFFICHAGE CSS
	const disableArrowClass = (card: CardInterface) => {

		const arrArrows: string[] = ["", ""];

		if (card.column === 1) {
			arrArrows[0] = "disable disableArrowClass";
		}

		if (card.column === 4) {
			arrArrows[1] = "disable disableArrowClass";
		}

		return arrArrows;
	}



	return (

		<div className="card-container">
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
						removable={true}
						handleRemoveCard={() => { handleClickRemoveCard(props.card.id) }}
					></ModalChild>
				</ModalRoot>
			)}

			<div className="card">

				<div className="card-body">
					<div className="card-arrows">
						<button
							className={disableArrowClass(props.card)[0] + " btn btn-arrows"}
							onClick={props.col.id === 1 ? undefined : () => handleClickArrow(props.col.id - 1, props.card)}
						>
							<CaretLeftFill />
						</button>



						<button className={disableArrowClass(props.card)[1] + " btn btn-arrows"}
							onClick={props.col.id === 4 ? undefined : () => handleClickArrow(props.col.id + 1, props.card)}
						>
							<CaretRightFill />
						</button>
					</div>

					<h4 className="card-title" onClick={toggleAnswer}>{props.card.question + " ?"}</h4>

					{isTextVisible ? (
						<div>
							<h5 className="card-text">{props.card.answer + "."}</h5>
						</div>)
						: (null)}
				</div>


				<div className="card-footer">
					<button className="btn color-main-btn card-btn" onClick={() => handleClickShowEditModalCard(true)}  ><GearFill className="cards-icons"></GearFill></button>
				</div>


			</div>

		</div>
	);
}

export default Card;