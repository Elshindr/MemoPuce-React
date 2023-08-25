interface CardInterface {
    id: number,
    uid: string,
    question: string,
    answer: string,
    column: number,
    selected: boolean,
    tid: number

}

export default CardInterface;