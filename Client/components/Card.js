import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { toggleCheckingIn } from '../redux/actions/checkingIn'
import PopUpWindow from './PopUpWindow'

const Card = ({ place, url, fetchList }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [details, setDetails] = useState(false)
  const { checkingIn, expoPushToken } = useSelector(state => state)
  const dispatch = useDispatch()
  const imgURL = url + place.imgURL
  const userID = '5dd50ab87153751890c06087'
  const isNear = place.distance < 0.01
  const placeName = <Text style={styles.modalPlace}>{place.name}:</Text>

  const getCurrentTime = () => {
    const date = new Date().toString()
    return date.match(/\d{2}:\d{2}(?=:)/).join()
  }

  const isOpen = () => {
    const currentTime = getCurrentTime()
    return place.hours.opens < currentTime && place.hours.closes > currentTime
  }

  const checkIfClosingSoon = () => {
    const currentTime = getCurrentTime()
    const hoursLeft = place.hours.closes.split(':')[0] - currentTime.split(':')[0]
    const minutesLeft = currentTime.split(':')[1] - place.hours.closes.split(':')[1]
    if (hoursLeft === 1 && minutesLeft === 30 && !checkingIn) {
      fetch(`${url}/notifications/auto`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: place.name,
          message: `${place.name} is closing in half an hour`,
          key: expoPushToken
        })
      })
    }
  }

  useInterval(() => {
    checkIfClosingSoon()
  }, 60000)

  function useInterval(callback, delay) {
    const savedCallback = useRef()

    useEffect(() => {
      savedCallback.current = callback
    }, [callback])

    useEffect(() => {
      function tick() {
        savedCallback.current()
      }
      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }

  const toggleDetailView = () => {
    setDetails(!details)
    fetchList()
  }

  const dispatchToggleCheckingIn = () => {
    dispatch(toggleCheckingIn(checkingIn))
    setUserStatus()
    fetchPatch()
    checkinPush()
    fetchList()
    setModalVisible(!modalVisible)
  }

  const checkinPush = () => {
    fetch(`${url}/notifications/checkin`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: place.name,
        message: checkingIn ? `Checked In at ${place.name}` : `Checked Out from ${place.name}`,
        key: expoPushToken
      })
    })
  }

  const fetchPatch = () => {
    fetch(`${url}/api/places/${place._id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: {
          isCheckedIn: checkingIn
        }
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  }

  const setUserStatus = () => {
    fetch(`${url}/api/users/${userID}/checkin`, {
      method: 'PATCH',
      body: JSON.stringify({
        isCheckedIn: checkingIn,
        place: place._id
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  const renderButton = () => {
    if (isNear && isOpen()) {
      return <TouchableOpacity style={styles.toggleCheckIn} activeOpacity={1} onPress={() => dispatchToggleCheckingIn()}>
        <Text style={styles.toggleCheckIn_text}>{checkingIn ? 'Check In' : 'Check Out'}</Text>
      </TouchableOpacity>
    }
  }

  const displayHighlights = () => {
    if (details) {
      return <Text style={styles.highlightsDetailed}> · {place.info.highlights.join('\n · ')}</Text>
    } else if (isNear && isOpen()) {
      return <Text style={styles.highlightsNear}>{place.info.highlights.join(' · ')}</Text>
    } else {
      return <Text style={styles.highlightsFar}>{place.info.highlights.join(' · ')}</Text>
    }
  }

  const toggleCardHeight = () => {
    if (details) {
      return Dimensions.get('window').width * 0.5 + 200
    } else if (isNear && isOpen()) {
      return Dimensions.get('window').width * 0.5 + 40
    } else {
      return Dimensions.get('window').width * 0.50
    }
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => toggleDetailView()}>
      <PopUpWindow modalVisible={modalVisible} setModalVisible={setModalVisible} message={checkingIn ? 'Checked Out' : `Checked In`} placeName={placeName} />
      <ImageBackground source={{ uri: imgURL }} imageStyle={{ borderRadius: 12 }} style={[styles.cardbackground, { height: toggleCardHeight() }]}>
        <Text style={[styles.hours, { backgroundColor: isOpen() ? 'rgba(102,225,137,0.45)' : 'rgba(225,102,102,0.45)' }]}>Open {place.hours.opens.split(':')[0]}-{place.hours.closes.split(':')[0]}</Text>
        <Text style={styles.heading}>{place.name}</Text>
        <Text style={styles.address}>{place.address.street}</Text>
        <Text style={styles.membersHere}>Members here</Text>
        <Text style={styles.capacity}>{place.currentUsers}/{place.capacity}</Text>
        {details && (<Text style={styles.description}>{place.info.description}</Text>)}
        {displayHighlights()}
        <View style={styles.overlay} />
        {!place.launched && (<View style={styles.comingSoon}><Text style={styles.comingSoonText}>Coming Soon</Text></View>)}
        {renderButton()}
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardbackground: {
    width: Dimensions.get('window').width - 100,
    marginTop: 25,
    marginBottom: 25,
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
  },
  highlightsNear: {
    color: '#B6B6B6',
    zIndex: 1,
    fontSize: 8,
    textAlign: 'center',
    position: 'absolute',
    bottom: 48,
    left: 16,
    width: '100%'
  },
  highlightsFar: {
    color: '#B6B6B6',
    zIndex: 1,
    fontSize: 8,
    textAlign: 'center',
    position: 'absolute',
    bottom: 13,
    left: 16,
    width: '100%'
  },
  highlightsDetailed:
  {
    color: '#D1D1D1',
    zIndex: 1,
    fontSize: 14,
    paddingTop: 15,
    paddingHorizontal: 5,
    lineHeight: 20
  },
  toggleCheckIn_text2: {
    display: 'none'
  },
  toggleCheckIn_text: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    zIndex: 1
  },
  toggleCheckIn: {
    backgroundColor: '#FA8993',
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width - 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 10
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 12,
    zIndex: 0
  },
  hours: {
    color: 'white',
    zIndex: 1,
    fontSize: 10,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    alignSelf: 'flex-start'
  },
  heading: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    zIndex: 1
  },
  address: {
    color: 'white',
    zIndex: 1,
    fontSize: 11
  },
  membersHere: {
    color: 'white',
    zIndex: 1,
    textAlign: 'right',
    fontSize: 11,
    fontWeight: 'bold',
    paddingTop: 15
  },
  capacity: {
    color: 'white',
    zIndex: 1,
    textAlign: 'right',
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
    zIndex: 1,
    fontSize: 16,
    paddingTop: 15,
    paddingHorizontal: 5
  },
  comingSoon: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 12,
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonText: {
    color: '#B6B6B6',
    fontSize: 24,
    fontWeight: 'bold'
  },
  modalPlace: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default Card
