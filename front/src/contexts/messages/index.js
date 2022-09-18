import React, { createContext, useReducer } from "react";
import {
  GET_MESSAGES,
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
} from "../../services/messages";

import messageReducer from "./MessageReducer";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, { messages: [] });

  async function listMessages() {
    const response = GET_MESSAGES();
    const status = response.then(
      (data) => {
        dispatch({
          type: "LIST_MESSAGES",
          payload: data,
        });
        return Promise.resolve(true);
      },
      (error) => {
        console.log(error);
        return Promise.reject(false);
      }
    );

    return status
  }

  async function addMessage(message) {
    const response = CREATE_MESSAGE(message);

    const status = await response.then(
      (data) => {
        dispatch({
          type: "ADD_MESSAGE",
          payload: data,
        });
        return Promise.resolve(true);
      },
      (error) => {
        console.log(error);
        return Promise.reject(false);
      }
    );

    return status;
  }

  async function editMessage(id, message) {
    const response = EDIT_MESSAGE(id, message);

    const status = await response.then(
      (data) => {
        dispatch({
          type: "EDIT_MESSAGE",
          payload: data,
        });
        return Promise.resolve(true);
      },
      (error) => {
        console.log(error);
        return Promise.reject(false);
      }
    );

    return status;
  }

  async function deleteMessage(id) {
    const response = DELETE_MESSAGE(id);

    const status = await response.then(
      (data) => {
        dispatch({
          type: "DELETE_MESSAGE",
          payload: id,
        });
        return Promise.resolve(true);
      },
      (error) => {
        console.log(error);
        return Promise.reject(false);
      }
    );
  }

  return (
    <MessageContext.Provider
      value={{
        messages: state.messages,
        listMessages,
        addMessage,
        editMessage,
        deleteMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
