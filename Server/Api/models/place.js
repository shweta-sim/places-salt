const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        },
        latitude: {
            type: String,
            required: true
        }
    },
    hours: {
        opens: {
            type: String,
            required: true
        },
        closes: {
            type: String,
            required: true
        }
    },
    info: {
        description: {
            type: String,
            required: true
        },
        highlights: {
            type: [String],
            required: true
        }
    },
    capacity: {
        type: Number,
        required: true
    },
    currentUsers: {
        type: Number,
        required: true
    },
    launched: {
        type: Boolean,
        required: false
    }
})

module.exports = mongoose.model('Place', placeSchema)
