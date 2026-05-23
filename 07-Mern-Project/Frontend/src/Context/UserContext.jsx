import React from "react";
import { createContext, useState } from "react";
import { useContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("userData");

    return userData ? JSON.parse(userData) : null;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const getUser = () => useContext(UserContext);
