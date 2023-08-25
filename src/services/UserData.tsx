import UserInterface from "../interfaces/UserInterface";

export default class UserData {

    static url: string = "http://localhost:3001/";
    private static instance: UserData;

    private constructor() {
    }

    public static getInstance(): UserData {

        if (!UserData.instance) {
            UserData.instance = new UserData();
        }

        return UserData.instance;

    }

    public static async loadOneUser(login: string, pwd: string): Promise<UserInterface[]> {

        return fetch(this.url + 'users?username=' + login + '&pwd=' + pwd)
            .then(res => {
                console.log(`res`,res)
                return res.json();
            })
            .then(user => {
                console.log(`loadOneUser : user`, user);
                return user;
            })
            .catch(error => {
                console.log(`Erreur dans loadOneUser`, error);
            });
    }

}