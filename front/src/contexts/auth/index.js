import { createContext, useReducer } from "react";
import { LOGIN } from "../../services/auth";
import authReducer from "./reducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { auth: {} });

  async function login(credentials) {
    try {
      const response = await LOGIN(credentials);
      window.localStorage.setItem("token", response);
      dispatch({ type: "LOGIN", data: response });
      return true;
    } catch (error) {
      return false;
    }
  }

  async function logout() {
    try {
      window.localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        auth: state.auth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
