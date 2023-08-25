import TermInterface from "../interfaces/TermsInterface";
import { v4 as uuidv4 } from 'uuid';

export default class TermData {

    static url: string = "http://localhost:3001/";


    public static async loadTerms(): Promise<TermInterface[]> {

        return fetch(this.url + 'terms')
            .then(res => {
                return res.json();
            })
            .then(terms => {
                return terms;
            })
            .catch(error => {
                console.log(`Erreur dans loadTerms`, error);
            });
    }


    public static async addTerm(name: string): Promise<boolean> {
        return fetch(this.url + 'terms',
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ "name": name, "open": false, "selected": false, "uid": uuidv4() })
            })
            .then(() => {
                return true;
            })
            .catch(error => {// TODO: Gestion affichage de l'erreur
                console.log(`Error dans addTerm`, error);
                return false;
            });
    }


    public static async removeTerm(id: number): Promise<boolean> {
        return fetch(this.url + 'terms/' + id,
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
                console.log(`Error dans removeTerm`, error);
                return false;
            });
    }


    public static async updateTerm(term: TermInterface): Promise<boolean> {
        return fetch(this.url + 'terms/' + term.id,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "PATCH",
                body: JSON.stringify({ "name": term.name })
            })
            .then(() => {
                return true;
            })
            .catch(error => {// TODO: Gestion affichage de l'erreur
                console.log(`Error dans updateTerm`, error);
                return false;
            });
    }

}