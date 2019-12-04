const express = require('express')
const router = express.Router()
const Place = require('../models/place')
const { getPlace } = require('./middleware')


// get all places
router.get('/places', async (req, res) => {
  try {
    const places = await Place.find()
    res.json(places)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// get one place
router.get('/places/:id', getPlace, async (req, res) => {
  res.json(res.place)
})

// create one place
router.post('/places', async (req, res) => {
  const place = new Place({
    name: req.body.name,
    imgURL: req.body.imgURL,
    address: req.body.address,
    hours: req.body.hours,
    info: req.body.info,
    capacity: req.body.capacity,
    currentUsers: req.body.currentUsers
  })

  try {
    const newPlace = await place.save()
    res.status(201).json(newPlace)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// delete one place
router.delete('/places/:id', getPlace, async (req, res) => {
  try {
    const removedPlace = await res.place.remove()
    res.json(removedPlace)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// update current users per place
router.patch('/places/:id', getPlace, async (req, res) => {

  if (req.body.status.isCheckedIn === true) {
    res.place.currentUsers = res.place.currentUsers + 1
  }

  if (req.body.status.isCheckedIn === false) {
    res.place.currentUsers = res.place.currentUsers - 1
  }

  try {
    const updatedPlace = await res.place.save()
    res.json(updatedPlace)
  } catch {
    res.status(400).json({ message: err.message })
  }
})

// set coming soon status
router.patch('/places/launched/:id', getPlace, async (req, res) => {
  res.place.launched = req.body.launched

  try {
    const updatedPlace = await res.place.save()
    res.json(updatedPlace)
  } catch {
    res.status(400).json({ message: err.message })
  }
})

// update whole place
router.patch('/places/update/:id', getPlace, async (req, res) => {
  Object.keys(req.body).forEach(key => { 
  res.place[key] = req.body[key]})

  try {
    const updatedPlace = await res.place.save()
    res.json(updatedPlace)
  } catch {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router