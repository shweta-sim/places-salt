import React, { useState } from 'react'
import { View, Text, TextInput, Image, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setLogin } from '../redux/actions/login'
import Constants from 'expo-constants'
import PopUpWindow from './PopUpWindow'

const Login = () => {
  const loggedIn = useSelector(state => state.login)
  const dispatch = useDispatch()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [modalVisible, setModalVisible] = useState(false)

  const updateLogin = () => {
    // if (/[u|U]ser@joinplaces.co/.test(username) && password === '123457') {
      dispatch(setLogin(!loggedIn))
    // } else {
    //   setModalVisible(!modalVisible)
    // }
  }

  return (
    <View style={styles.view}>
      <PopUpWindow
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        message='Incorrect username or password'
      />
      <Image
        style={styles.logo}
        source={require('../assets/logo-places-black.png')}
      />
      <TextInput
        style={styles.logInTextInput}
        placeholder='Username'
        onFocus={() => setUsername('')}
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.logInTextInput}
        placeholder='Password'
        onFocus={() => setPassword('')}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.logInButton}
        activeOpacity={0.9}
        onPress={() => updateLogin()}
      >
      <Text style={styles.logInButtonText}>Log in</Text>
      </TouchableOpacity>
      <Text style={styles.info}>Don't have an account? 
      <Text
          style={styles.signup}
          onPress={() => Linking.openURL('http://joinplaces.co/join')}
        > Sign up here.
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  signup: {
    color: '#DF8187',
    fontWeight: 'normal',
    textDecorationLine: 'underline'
  },
  info: {
    marginBottom: 100,
    fontSize: 12,
    fontWeight: 'bold'
  },
  logo: {
    marginBottom: 70,
    paddingTop: 15
  },
  logInTextInput: {
    backgroundColor: '#F3F3F3',
    width: Dimensions.get('window').width - 100,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15
  },
  logInButtonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    zIndex: 1
  },
  logInButton: {
    backgroundColor: '#FA8993',
    width: Dimensions.get('window').width - 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15
  },
  view: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 10,
    alignItems: 'center',
    width: Dimensions.get('window').width,
    justifyContent: 'center'
  },
  modalText: {
    fontSize: 16,
    paddingBottom: 36
  },
  modalButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#FA8993',
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width - 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 10
  },
  modalBg: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    flex: 1,
  },
  modal: {
    width: Dimensions.get('window').width - 70,
    height: Dimensions.get('window').width - 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    alignSelf: 'center'
  },

})

export default Login