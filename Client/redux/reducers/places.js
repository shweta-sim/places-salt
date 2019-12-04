// Initial state
const initState = {
  places: []
}


export const placeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'PLACES_TO_LIST':
      return {
        ...state,
        places: action.places
      }
    default:
      return state;
  }
}