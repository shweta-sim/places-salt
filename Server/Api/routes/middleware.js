const User = require('../models/user')
const Place = require('../models/place')

const getUser = async (req, res, next) => {
    try {
      user = await User.findById(req.params.id)
      if (user == null) {
        return res.status(404).json({ message: 'Cant find user'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
    res.user = user
    next()
  }

 const getPlace = async (req, res, next) => {
    try {
      place = await Place.findById(req.params.id)
      if (place == null) {
        return res.status(404).json({ message: 'Cant find place'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.place = place
    next()
  }

  module.exports = { getUser, getPlace }