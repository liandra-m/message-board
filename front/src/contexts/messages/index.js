import React, {createContext, useReducer} from 'react';
import { GET_MESSAGES, CREATE_MESSAGE, DELETE_MESSAGE, EDIT_MESSAGE } from '../../services/messages';

import messageReducer from './MessageReducer';

export const MessageContext = createContext();

export const MessageProvider = ({children}) => {
    const [state, dispatch] = useReducer(messageReducer, {messages: []});

    function listMessages() {
        const response = GET_MESSAGES();
        response.then(
            data => {
                dispatch({
                    type: 'LIST_MESSAGES',
                    payload: data
                });
            },
            error => {
                console.log(error);
            }
        )
    }

    function addMessage(message) {
        const response = CREATE_MESSAGE(message);
        if (response) {
            dispatch({
                type: 'ADD_MESSAGE',
                payload: message
            });
        }
    };

    function editMessage(id, message) {
        const response = EDIT_MESSAGE(id, message);
        response.then(
            data => {
                dispatch({
                    type: 'EDIT_MESSAGE',
                    payload: data
                });
            },
            error => {
                console.log(error);
            }
        )
    };

    function  deleteMessage(id) {
        const response = DELETE_MESSAGE(id);
        if (response) {
            dispatch({
                type: 'DELETE_MESSAGE',
                payload: id
            });
        }
    };

    return (
        <MessageContext.Provider value={{messages: state.messages, listMessages, addMessage, editMessage, deleteMessage }}>
            {children}
        </MessageContext.Provider>
    );
};