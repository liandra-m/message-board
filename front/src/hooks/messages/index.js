import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  GET_MESSAGES,
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
} from "services/messages";

import messageReducer from "./reducer";

export const MessageContext = createContext();
export const MessageDispatchContext = createContext();

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, { messages: [] });
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  const getMessages = async () => {
    try {
      const data = await GET_MESSAGES();

      dispatch({
        type: "LIST_MESSAGES",
        payload: data,
      });
    } catch (error) {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <MessageContext.Provider
      value={{ messages: state.messages, failed, loading }}
    >
      <MessageDispatchContext.Provider value={dispatch}>
        {children}
      </MessageDispatchContext.Provider>
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);

  if (!context)
    throw new Error("useMessages must be used within a MessagesProvider");

  return context;
};

export const useDispatch = () => {
  const dispatch = useContext(MessageDispatchContext);

  if (!dispatch)
    throw new Error("useMessages must be used within a MessagesProvider");

  return dispatch;
};

export const useAddMessage = () => {
  const dispatch = useDispatch();

  const addMessage = async (message, options) => {
    const { onSuccess, onError } = options;

    try {
      const response = await CREATE_MESSAGE(message);

      dispatch({
        type: "ADD_MESSAGE",
        payload: response,
      });

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return addMessage;
};

export const useEditMessage = () => {
  const dispatch = useDispatch();

  const editMessage = async (id, message, options) => {
    const { onSuccess, onError } = options;
    try {
      const response = await EDIT_MESSAGE(id, message);

      dispatch({
        type: "EDIT_MESSAGE",
        payload: response,
      });

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return editMessage;
};

export const useDeleteMessage = () => {
  const dispatch = useDispatch();

  const deleteMessage = async (id, options) => {
    const { onSuccess, onError } = options;

    try {
      const response = await DELETE_MESSAGE(id);

      dispatch({
        type: "DELETE_MESSAGE",
        payload: id,
      });

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return deleteMessage;
};
