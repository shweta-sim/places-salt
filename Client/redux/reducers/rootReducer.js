import { combineReducers } from 'redux';
import { placeReducer } from './places';
import { locationReducer } from './location';
import { checkingInReducer } from './checkingIn';
import { tokenReducer } from './token';
import { notificationReducer } from './notifications';
import { profileReducer } from './profile';
import { loginReducer } from './login';

// Root reducer - COMBINE REDUCERS
export const rootReducer = combineReducers({
    places: placeReducer,
    location: locationReducer,
    checkingIn: checkingInReducer,
    expoPushToken: tokenReducer,
    notifications: notificationReducer,
    profile: profileReducer,
    login: loginReducer
})



