import React from 'react'
import GeoLocation from './components/GeoLocation'
import PushHandler from './components/PushHandler'
import { store } from './redux/store/store'
import { Provider } from 'react-redux'
import LoginVerification from './components/LoginVerification'

const App = () => {  
  return (
    <Provider store={store}>
      <LoginVerification />
      <GeoLocation />
      <PushHandler />
    </Provider>
  )
}

export default App