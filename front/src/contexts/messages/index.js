import React, {createContext, useReducer} from 'react';

import messageReducer from './MessageReducer';

const initialState = {
    messages: [
        {
            id: 0,
            title: "Whatever",
            content: "Blah blah blah"
        }
    ]
}

export const MessageContext = createContext(initialState);

export const MessageProvider = ({children}) => {
    const [state, dispatch] = useReducer(messageReducer, initialState);

    function addMessage(message) {
        dispatch({
            type: 'ADD_MESSAGE',
            payload: message
        });
    };

    function editMessage(message) {
        dispatch({
            type: 'EDIT_MESSAGE',
            payload: message
        });
    };

    function  deleteMessage(id) {
        dispatch({
            type: 'DELETE_MESSAGE',
            payload: id
        });
    };

    return (
        <MessageContext.Provider value={{messages: state.messages, addMessage, editMessage, deleteMessage }}>
            {children}
        </MessageContext.Provider>
    );
};