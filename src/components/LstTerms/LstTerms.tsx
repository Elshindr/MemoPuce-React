import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Contexts/UserContext";
import CardInterface from "../../interfaces/CardInterface";
import ColumnInterface from "../../interfaces/ColumnInterface";
import TermInterface from "../../interfaces/TermsInterface";
import CardData from "../../services/CardData";
import ColumnData from "../../services/ColumnData";
import TermData from "../../services/TermData";

const LstTerms = () => {
    const user = useUser();
    const { updateUser } = useUser();
    const navigate = useNavigate();

    const [cards, setCards] = useState<CardInterface[]>([]);
    const [terms, setTerms] = useState<TermInterface[]>([]);
    const [columns, setColumns] = useState<ColumnInterface[]>([]);
    const [curTerm, setCurTerm] = useState<TermInterface | null>(null);

    // Redirection si l'utilisateur est déconnecté
    useEffect(() => {
        /*  if (user.user === null) {
              navigate("/Home");
          }else {*/

        (async () => {
            const lstCards = await CardData.loadCards();
            setCards(lstCards);

            const lstTerms = await TermData.loadTerms();
            setTerms(lstTerms);

            const lstColumns = await ColumnData.loadColumns();
            setColumns(lstColumns);

        })();
        //}


    }, [user, curTerm, navigate]);


    const getNbCardByTermByCol = (term: TermInterface): number => {
        return columns.reduce((sum, col) => {
            return sum + cards.filter(card => card.column === col.id && card.tid === term.id).length;
        }, 0);
    }


    return (
        <div key="table-terms" className="table-terms-container">
            <table className="table">

                <thead className="table-dark">
                    <tr>
                        <th scope="col">Thème</th>
                        <th scope="col">A apprendre</th>
                        <th scope="col">Je sais un peu</th>
                        <th scope="col">Je sais bien</th>
                        <th scope="col">Je sais parfaitement</th>
                    </tr>
                </thead>

                <tbody>
                    {terms.map(term => {
                        const nbCards = getNbCardByTermByCol(term); 
                        return (
                            <tr key={term.id}>
                                <td scope="col">{term.name}</td>
                                <td scope="col">{nbCards}</td>
                            </tr>
                        );
                    })}
                </tbody>
                
            </table>
        </div>
    );
}

export default LstTerms;