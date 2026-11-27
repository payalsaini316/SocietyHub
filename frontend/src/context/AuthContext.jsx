import { createContext, useContext, useState } from "react";
import { apiRequest } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // Register
  const registerUser = async (formData) => {
    const data = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(formData)
    });

    return data;
  };

  // Login
  const loginUser = async (formData) => {
    setLoading(true);

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(formData)
      });

      setUser(data.user);
      setAccessToken(data.accessToken);

      return data;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logoutUser = async () => {
    try {
      await apiRequest("/auth/logout", {
        method: "POST"
      });
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        registerUser,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};