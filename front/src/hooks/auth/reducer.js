export default function authReducer(state, action) {
  switch (action.type) {
    case "ME":
      return {
        ...state,
        me: action.data,
      };
    case "LOGOUT":
      return {
        ...state,
        me: {},
      };
    default:
      return state;
  }
}
