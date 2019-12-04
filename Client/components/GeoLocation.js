import { useEffect, useRef } from 'react'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { useDispatch } from 'react-redux'
import { updateLocation, setErrorMessage } from '../redux/actions/location'

const GeoLocation = () => {
  const dispatch = useDispatch()

  const useInterval = (callback, delay) => {
    const savedCallback = useRef()

    useEffect(() => {
      savedCallback.current = callback
    }, [callback])

    useEffect(() => {
      const tick = () => savedCallback.current()
      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }

  useInterval(() => {
    getLocationSum()
  }, 500)

  const locationSum = (geo) => geo.coords.latitude + geo.coords.longitude

  const getLocationSum = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      dispatch(setErrorMessage('Permission to access location was denied'))
    }
    let geoLocation = await Location.getCurrentPositionAsync({})
    dispatch(updateLocation(locationSum(geoLocation)))
  }
  return null
}

export default GeoLocation