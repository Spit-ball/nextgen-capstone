import { useState, createContext, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (username, password) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data)
            setAuthUser(data.user.username); // had to change this from data.user to data.user.username
            setIsLoggedIn(true);
            console.log('isLoggedIn after login:', isLoggedIn)
        } catch (error) {
            console.error('Login failed:', error);
        }

    }

    const logout = () => {
        setAuthUser(null);
        setIsLoggedIn(false);
    }



    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, isLoggedIn, setIsLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};