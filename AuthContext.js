import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check token in storage when app starts
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setUserToken(token);
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (token) => {
    await AsyncStorage.setItem("userToken", token);
    setUserToken(token);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userToken");
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
