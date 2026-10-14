import { createContext, useEffect, useState } from 'react';
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    
    // initialize the currentUser state variable by checking to see if it's in sessionStorage
    const [currentUser, setCurrentUser] = useState(() => {
        const user = sessionStorage.getItem("currentUser");
        return user ? JSON.parse(user) : null;
    });

    // On currentUser state change, update the sessionStore accordingly
    useEffect(() => {
        if(currentUser){
            sessionStorage.setItem("currentUser", JSON.stringify(currentUser))
        }else{
            sessionStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
}