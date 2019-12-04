const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  name: {
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
    }
  },
  contactInfo: {
    phone: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: false
    }
  },
  status: {
    isCheckedIn: {
      type: Boolean,
      required: false
    },
    place: {
      type: String,
      required: false
    }
  },
  pushToken: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('User', userSchema)
