import { useEffect } from 'react'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import { useSelector, useDispatch } from 'react-redux'
import { setUserToken } from '../redux/actions/token'
import { setNotification } from '../redux/actions/notifications'

const PushHandler = () => {
  const pushToken = useSelector(state => state.expoPushToken)
  const dispatch = useDispatch()
  const baseUrl = 'http://192.168.35.146:3000'
  const userID = '5dd50ab87153751890c06087'

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      )

      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        )
        finalStatus = status
      }

      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }

      let token = await Notifications.getExpoPushTokenAsync()
      dispatch(setUserToken(token))
    } else {
      alert('Must use physical device for Push Notifications')
    }
  }

  const sendUserToken = () => {
    fetch(`${baseUrl}/api/users/${userID}/token`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pushToken: pushToken,
      })
    })
  }

  useEffect(() => {
    registerForPushNotificationsAsync()
    Notifications.addListener(notification => dispatch(setNotification(notification)))
    if (pushToken) {
      sendUserToken()
    }
  }, [pushToken])

  return null
}

export default PushHandler