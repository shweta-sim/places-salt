import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setProfileData } from '../../redux/actions/profile'
import { setLogin } from '../../redux/actions/login'
import Constants from 'expo-constants'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const { profile, checkingIn, login, places } = useSelector(state => state)
  const [currentPlace, setCurrentPlace] = useState(null)
  const baseUrl = 'http://192.168.35.146:3000'
  const userID = '5dd50ab87153751890c06087'

  const getUserData = () => {
    fetch(`${baseUrl}/api/users/${userID}`)
      .then(res => res.json())
      .then(data => dispatch(setProfileData(data)))
      .then(data => findPlaceById(data.profile.status.place))
  }

  const findPlaceById = (id) => {
    const matchedPlace = places.places
      .filter(place => place._id == id)
    setCurrentPlace(matchedPlace[0].name)
  }

  useEffect(() => {
    getUserData()
  }, [checkingIn])

  return (
    <View style={styles.profileScreen}>
      <View style={styles.headingText}>
        <Text style={styles.heading}>Profile</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.logOutButton}
        onPress={() => dispatch(setLogin(!login))}
      >
        <Text style={styles.logOutButtonText}>Log out</Text>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Image
          style={styles.profilePic}
          source={require('../../assets/avatar-icon.png')}
        />
        <Text style={styles.name}>{profile && profile.name.firstName}</Text>
        <Text style={styles.name}>{profile && profile.name.lastName}</Text>
        <Text style={styles.contact}>{profile && profile.contactInfo.phone}</Text>
        <Text style={styles.contact}>{profile && profile.contactInfo.email}</Text>
      </View>
      {profile && checkingIn ?
        <Text style={styles.checkinStatus}>Not checked in</Text> :
        <Text style={styles.checkinStatus}>Checked in at {currentPlace}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  profilePic: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    marginBottom: 30
  },
  checkinStatus: {
    marginTop: 70
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.get('window').height * 0.05
  },
  profileScreen: {
    marginTop: Constants.statusBarHeight + 10,
    alignItems: 'center'
  },
  heading: {
    fontSize: 30,
    textAlign: 'left',
    fontWeight: 'bold',
    paddingLeft: 30,
    paddingTop: 30,
    paddingBottom: 15,
    color: '#4D4D4D'
  },
  headingText: {
    width: Dimensions.get('window').width
  },
  logOutButtonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    zIndex: 1
  },
  logOutButton: {
    backgroundColor: '#FA8993',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 15,
    marginBottom: 15,
    position: 'absolute',
    top: 30,
    right: 20
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contact: {
    marginTop: 10
  }
})

export default ProfileScreen