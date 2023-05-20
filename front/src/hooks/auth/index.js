import { createContext, useContext, useReducer } from "react";
import { LOGIN, REGISTER } from "services/auth";
import authReducer from "./reducer";

export const AuthContext = createContext();
export const AuthDispatchContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { auth: {} });

  return (
    <AuthContext.Provider
      value={{
        auth: state.auth,
      }}
    >
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

function useDispatch() {
  const dispatch = useContext(AuthDispatchContext);

  return dispatch;
}

export const useLogin = () => {
  const dispatch = useDispatch();

  const login = async (credentials, options) => {
    const { onSuccess, onError } = options;

    try {
      const response = await LOGIN(credentials);

      window.localStorage.setItem("token", response);
      dispatch({ type: "LOGIN", data: response });

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return login;
};

export const useSignup = () => {
  const dispatch = useDispatch();

  const signup = async (data, options) => {
    const { onSuccess, onError } = options;

    try {
      const response = await REGISTER(data);

      window.localStorage.setItem("token", response);
      dispatch({ type: "LOGIN", data: response });

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return signup;
};

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = async (options) => {
    const { onSuccess, onError } = options;

    try {
      window.localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return logout;
};
