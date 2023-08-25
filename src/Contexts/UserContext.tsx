import React, { createContext, useContext, useState } from 'react';
import UserInterface from '../interfaces/UserInterface';

interface UserContextType {
    user: UserInterface | null;
    setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
    updateUser: (newUser: UserInterface) => void;
}


const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: React.PropsWithChildren<{}>) {

    const [user, setUser] = useState<UserInterface | null>(null);
    
    const updateUser = (newUser: UserInterface) => {
        setUser(newUser);
    };

    const contextValue: UserContextType = {
        user,
        setUser,
        updateUser
    };


    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser(): UserContextType {
    const context = useContext(UserContext);
    if (context === null) {
        throw new Error('useUser n est pas dans wrapper dans UserProvider');
    }
    return context;
}

function useEffect(arg0: () => void, arg1: (UserInterface | null)[]) {
    throw new Error('Function not implemented.');
}
