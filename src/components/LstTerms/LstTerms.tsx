import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Contexts/UserContext";
import CardInterface from "../../interfaces/CardInterface";
import ColumnInterface from "../../interfaces/ColumnInterface";
import TermInterface from "../../interfaces/TermsInterface";
import CardData from "../../services/CardData";
import ColumnData from "../../services/ColumnData";
import TermData from "../../services/TermData";
import { useTerm } from "../../Contexts/TermContext";



const LstTerms = () => {

    // USER
    const user = useUser();

    // TERM Current
    const { curTerm } = useTerm();
    const { updateCurTerm } = useTerm();

    const navigate = useNavigate();

    const [cards, setCards] = useState<CardInterface[]>([]);
    const [terms, setTerms] = useState<TermInterface[]>([]);
    const [columns, setColumns] = useState<ColumnInterface[]>([]);



    // Redirection si l'utilisateur est déconnecté
    useEffect(() => {
        if (user.user === null) {
            navigate("/");
        } else {

            (async () => {
                const lstCards = await CardData.loadCards();
                setCards(lstCards);

                const lstTerms = await TermData.loadTerms();
                setTerms(lstTerms);

                const lstColumns = await ColumnData.loadColumns();
                setColumns(lstColumns);

            })();
        }


    }, [user, curTerm, navigate]);

    const handleClickRowTerm = (term: TermInterface) => {
        updateCurTerm(term);
        navigate(`/Memos`);
    }

    return (
        <div key="table-terms" className="table-terms-container">

            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Thème</th>
                        {columns.map(col => (
                            <th scope="col" key={col.id}>{col.label}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {terms.map(term => (
                        <tr key={term.id} onClick={() => handleClickRowTerm(term)}>
                            <td scope="col">{term.name}</td>
                            {columns.map(col => (
                                <td scope="col" key={col.id} >
                                    {cards.filter(card => card.tid === term.id && card.column === col.id).length}
                                </td>
                            ))}
                        </tr>
                    ))}

                </tbody>

            </table>
        </div>
    );
}

export default LstTerms;