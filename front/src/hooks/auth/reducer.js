export default function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        auth: action.data,
      };
    case "LOGOUT":
      return {
        ...state,
        auth: {},
      };
    default:
      return state;
  }
}
