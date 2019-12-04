// Initial state
const initState = null;

export const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_PROFILE_DATA':
      return action.profile
    default:
      return state;
  }
}