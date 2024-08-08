import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHalfAuth, setIsHalfAuth] = useState(false);

  const signIn = () => {
    setIsAuthenticated(true);
    setIsHalfAuth(false);
  };
  const signOut = () => {
    setIsAuthenticated(false);
    setIsHalfAuth(false);
  };
  const continueWithoutSigningIn = () => {
    setIsAuthenticated(true);
    setIsHalfAuth(true);
  }; // Treat as authenticated for navigation purposes

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isHalfAuth,
        signIn,
        signOut,
        continueWithoutSigningIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
