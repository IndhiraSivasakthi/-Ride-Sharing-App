import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';  // Import Axios for making HTTP requests

const DriverContext = createContext();

export const useDriver = () => useContext(DriverContext);

export const DriverProvider = ({ children }) => {
    const [driver, setDriver] = useState(null);

    const signIn = (username) => {
        setDriver({ username });
    };

    const signOut = async () => {
        if (driver) {
            try {
                await axios.post('http://localhost:8080/api/driver/logout', {
                    username: driver.username
                });
                setDriver(null);
            } catch (error) {
                console.error("Failed to record logout:", error);
            }
        }
    };

    return (
        <DriverContext.Provider value={{ driver, signIn, signOut }}>
            {children}
        </DriverContext.Provider>
    );
};
