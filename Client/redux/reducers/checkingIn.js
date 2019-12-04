// Initial state
const initState = true;
  
  
  export const checkingInReducer = (state = initState, action) => {
    switch (action.type) {
      case 'TOGGLE_CHECKING_IN':
        return !state
      default:
        return state;
    }
  }