// Initial location
const initState = {
  location: null,
  errorMessage: null
}

export const locationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return {
        ...state,
        location: action.location
      };
    case 'SET_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
}