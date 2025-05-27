import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';  // Import Axios for making HTTP requests

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (username) => {
        setUser({ username });
    };

    const logout = async () => {
        if (user) {
            try {
                await axios.post('http://localhost:8080/api/logout', {
                    username: user.username
                });
                setUser(null);
            } catch (error) {
                console.error("Failed to record logout:", error);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
