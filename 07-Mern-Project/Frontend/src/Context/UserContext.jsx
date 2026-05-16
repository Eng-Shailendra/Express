import React from "react";
import { createContext, useState } from "react";
import { useContext } from "react";

export const UserConstext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserConstext.Provider value={{ user, setUser }}>
      {children}
    </UserConstext.Provider>
  );
};

export const getUser = () => useContext(UserConstext);
