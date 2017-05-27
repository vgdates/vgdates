const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const slug = require('slugs')

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please specify a game title'
  },
  slug: String,
  releases: [{
    platform: String,
    date: Date
  }],
  created: {
    type: Date,
    default: Date.now
  }
})

gameSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    return next()
  }
  this.slug = slug(this.name)
  next()
})

module.exports = mongoose.model('Game', gameSchema)