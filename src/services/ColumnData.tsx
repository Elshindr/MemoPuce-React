import ColumnInterface from "../interfaces/ColumnInterface";

export default class ColumnData {

    static url: string = "http://localhost:3001/";


    public static async loadColumns(): Promise<ColumnInterface[]> {

        return fetch(this.url + 'columns')
            .then(res => {
                return res.json();
            })
            .then(columns => {
                return columns;
            })
            .catch(error => {
                console.log(`Erreur dans loadColumns`, error);
            });
    }
}