const initState = false;

export const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return action.login
    default:
      return state;
  }
}