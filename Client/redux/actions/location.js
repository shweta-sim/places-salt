export const updateLocation = location => {
    return {
      type: 'UPDATE_LOCATION',
      location: location,
    }
  };

  export const setErrorMessage = errorMessage => {
    return {
      type: 'SET_ERROR_MESSAGE',
      errorMessage: errorMessage
    }
  };