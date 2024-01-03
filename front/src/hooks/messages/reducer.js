export default function messageReducer(state, action) {
  switch (action.type) {
    case "LIST_MESSAGES":
      return {
        ...state,
        messages: action.payload,
      };
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [action.payload, ...state.messages],
      };

    case "EDIT_MESSAGE":
      const updatedMessages = state.messages.map((message) => {
        if (message.id === action.payload.id) {
          return action.payload;
        }

        return message;
      });

      return {
        ...state,
        messages: updatedMessages,
      };

    case "DELETE_MESSAGE":
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.id !== action.payload
        ),
      };

    case "LIKE_MESSAGE":
      const likedMessages = state.messages.map((message) => {
        if (message.id === parseInt(action.payload.messageId)) {
          if (action.payload.status === "like") {
            return {
              ...message,
              likes: [...message.likes, action.payload],
            };
          } else {
            return {
              ...message,
              likes: message.likes.slice(0, -1),
            };
          }
        }

        return message;
      });

      return {
        ...state,
        messages: likedMessages,
      };

    default:
      return state;
  }
}
