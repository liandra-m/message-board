import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { LOGIN, REGISTER } from "services/auth";
import authReducer from "./reducer";
import { ME } from "services/auth";

export const AuthContext = createContext();
export const AuthDispatchContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { me: {} });
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  const me = async () => {
    try {
      const data = await ME();

      dispatch({
        type: "ME",
        data: data,
      });
    } catch (error) {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    me();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        me: state.me,
        failed,
        loading,
      }}
    >
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useMessages must be used within a MessagesProvider");

  return context;
};

export const useDispatch = () => {
  const dispatch = useContext(AuthDispatchContext);

  if (!dispatch)
    throw new Error("useMessages must be used within a MessagesProvider");

  return dispatch;
};

export const useLogin = () => {
  const dispatch = useDispatch();

  const login = async (credentials, options) => {
    const { onSuccess, onError } = options;

    try {
      const response = await LOGIN(credentials);

      window.localStorage.setItem("token", response?.token);
      dispatch({ type: "ME", data: response?.user });

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

      window.localStorage.setItem("token", response?.token);
      dispatch({ type: "ME", data: response?.user });

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
