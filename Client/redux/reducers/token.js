// Initial state
const initState = null;

export const tokenReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_USER_TOKEN':
      return action.token
    default:
      return state;
  }
}