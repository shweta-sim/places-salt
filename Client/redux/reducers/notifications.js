// Initial state
const initState = [];

export const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return [
        ...state,
        action.notification
      ]
    default:
      return state;
  }
}