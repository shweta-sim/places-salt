const express = require('express')
const router = express.Router()
const User = require('../models/user')

const { getUser } = require('./middleware')

// get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// get one user
router.get('/users/:id', getUser, async (req, res) => {
  res.json(res.user)
})

// create one user
router.post('/users', async (req, res) => {
  const user = new User({
    name: req.body.name,
    contactInfo: req.body.contactInfo,
    status: req.body.status,
  })

  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// delete one user
router.delete('/users/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: 'Deleted This User' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//  add pushtoken to user
router.patch('/users/:id/token', getUser, async (req, res) => {
  res.user.pushToken = req.body.pushToken
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch {
    res.status(400).json({ message: err.message })
  }
})

//  checkin user
router.patch('/users/:id/checkin', getUser, async (req, res) => {
  res.user.status.isCheckedIn = req.body.isCheckedIn
  res.user.status.place = req.body.place
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch {
    res.status(400).json({ message: err.message })
  }
})

// update whole user
router.patch('/users/update/:id', getUser, async (req, res) => {
  Object.keys(req.body).forEach(key => { 
  res.user[key] = req.body[key]})

  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router