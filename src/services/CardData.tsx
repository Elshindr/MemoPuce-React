import CardInterface from "../interfaces/CardInterface";
import { v4 as uuidv4 } from 'uuid';

export default class CardData {

    static url: string = "http://localhost:3001/";

    public static async loadCards(): Promise<CardInterface[]> {

        return fetch(this.url + 'cards')
            .then(res => {
                return res.json();
            })
            .then(cards => {
                return cards;
            })
            .catch(error => {
                console.log(`Erreur dans loadCards`, error);
            });
    }

    public static async addCard(qst: string, asw: string, idColumn: number, tid: number): Promise<boolean> {
        return fetch(this.url + 'cards',
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ "question": qst, "answer": asw, "column": idColumn, "uid": uuidv4(), "tid": tid , "selected":false})
            })
            .then(() => {
                return true;
            })
            .catch(error => {// TODO: Gestion affichage de l'erreur
                console.log(`Error dans addCard`, error);
                return false;
            });
    }


    public static async removeCard(id: number): Promise<boolean> {
        return fetch(this.url + 'cards/' + id,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "DELETE",

            })
            .then(res => {
                return true;
            })
            .catch(error => {// TODO: Gestion affichage de l'erreur
                console.log(`Error dans removeCard`, error);
                return false;
            });
    }


    public static async updateCard(card: CardInterface): Promise<boolean> {
        return fetch(this.url + 'cards/' + card.id,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "PATCH",
                body: JSON.stringify({ "question": card.question, "answer": card.answer, "column": card.column })
            })
            .then(() => {
                return true;
            })
            .catch(error => {// TODO: Gestion affichage de l'erreur
                console.log(`Error dans updateCard`, error);
                return false;
            });
    }
}