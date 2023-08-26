import { useNavigate } from 'react-router-dom';
import CardInterface from '../../interfaces/CardInterface';
import ColumnInterface from '../../interfaces/ColumnInterface';
import TermInterface from '../../interfaces/TermsInterface';
import { useUser } from '../../Contexts/UserContext';
import { useEffect, useState } from 'react';
import CardData from '../../services/CardData';
import TermData from '../../services/TermData';
import ColumnData from '../../services/ColumnData';
import Column from './Column';
import './Memos.css';
import Terms from './Terms';
import { useTerm } from '../../Contexts/TermContext';



const Memos = () => {

    // User Current
    const user = useUser();
    const { updateUser } = useUser();
    const navigate = useNavigate();

    // TERM Current
    const { curTerm } = useTerm();
    const { updateCurTerm } = useTerm();

    const [cards, setCards] = useState<CardInterface[]>([]);
    const [terms, setTerms] = useState<TermInterface[]>([]);
    const [columns, setColumns] = useState<ColumnInterface[]>([]);


    // Redirection si l'utilisateur est déconnecté
    useEffect(() => {
     /*   if (user.user === null) {
            navigate("/");
        } else {*/

            (async () => {
                const lstCards = await CardData.loadCards();
                setCards(lstCards);

                const lstTerms = await TermData.loadTerms();
                setTerms(lstTerms);

                const lstColumns = await ColumnData.loadColumns();
                setColumns(lstColumns);

            })();
       // }


    }, [user, curTerm, navigate]);


    async function reloadComponent(component: string) {

        switch (component) {
            case 'terms':
                const lstTerms = await TermData.loadTerms();
                setTerms(lstTerms);

                break;
            case 'cards':
                const lstCards = await CardData.loadCards();
                setCards(lstCards);
                break;
            case 'columns':
                const lstColumns = await ColumnData.loadColumns();
                setColumns(lstColumns);
                break;
            default: break;
        }
    }


    function onChangeCurrentTerm(term: TermInterface) {
        updateCurTerm(term);
    }



    return (<div>
        <h2>Mes cartes</h2>

        <Terms key='my-terms' terms={terms} curTerm={curTerm} onChangeCurTerm={(term: TermInterface) => onChangeCurrentTerm(term)} onchangeTerm={() => reloadComponent("terms")} />

        <div id="memos-container">
            {columns.map(col => <Column key={col.id}
                col={col}
                cards={cards.filter(card => { if (card.column === col.id && curTerm !== null && curTerm.id === card.tid) { return card; } })}
                terms={terms}
                curTerm={curTerm}
                onchangeTerm={() => reloadComponent("cards")}
            />
            )}
        </div>

    </div>);
}

export default Memos;