import React, { createContext, useContext, useState } from 'react';
import TermInterface from '../interfaces/TermsInterface';

interface TermContextType {
    curTerm: TermInterface | null;
    setCurTerm: React.Dispatch<React.SetStateAction<TermInterface | null>>;
    updateCurTerm: (newTerm: TermInterface) => void;
}


const TermContext = createContext<TermContextType | null>(null);

export function TermProvider({ children }: React.PropsWithChildren<{}>) {

    const [curTerm, setCurTerm] = useState<TermInterface | null>(null);

    const updateCurTerm = (newTerm: TermInterface) => {
        setCurTerm(newTerm);
    };

    const contextValue: TermContextType = {
        curTerm,
        setCurTerm,
        updateCurTerm
    };

    return (
        <TermContext.Provider value={contextValue}>
            {children}
        </TermContext.Provider>
    );
};

export function useTerm () :TermContextType {

    const context = useContext(TermContext);

    if (context === null) {
        throw new Error('useTerm n\'est pas dans wrapper dans TermProvider');
    }

    return context;
};
