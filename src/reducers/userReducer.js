// actions: LOGIN_INIT, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT
export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_INIT":
      return { ...state, loading: true, error: "" }
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, user: action.payload }
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload }
    case "LOGOUT":
      return { ...state, user: null, loading: false, error: "" }
    default:
      throw new Error(`Unsupported action type ${action.type} in userReducer`)
  }
}
