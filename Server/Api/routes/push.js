const express = require('express')
const { Expo } = require('expo-server-sdk')
const router = express.Router()
const User = require('../models/user')
const expo = new Expo()
const { getUser } = require('./middleware')

const handlePushTokens = async (message, title, key) => {
  let notifications = []
  const users = await User.find()
  for (let user of users) {
    const pushToken = user.pushToken;
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`)
      continue
    }

    if (pushToken === key) {
      notifications.push({
        to: pushToken,
        sound: 'default',
        title: title,
        body: message,
        data: { message, title }
      })
    }
  }

  let chunks = expo.chunkPushNotifications(notifications);

  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk)
        console.log(receipts)
      } catch (error) {
        console.error(error)
      }
    }
  })()
}

router.get('/', (req, res) => {
  res.send('Push Notification Server Running')
})

router.post('/checkin', (req, res) => {
  handlePushTokens(req.body.message, req.body.title, req.body.key)
  res.send(`Received message, ${req.body.message}`)
})

router.post('/auto', (req, res) => {
  handlePushTokens(req.body.message, req.body.title, req.body.key)
  res.send(`Received message, ${req.body.message}`)
})



module.exports = router