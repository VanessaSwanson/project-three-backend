import mongoose from 'mongoose'
import commentSchema from './comment.js'

const locationSchema = new mongoose.Schema(
  {
    streetNumber: { type: Number, required: true },
    streetName: { type: String, required: true },
    postcode: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  }
)

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true,  maxlength: 500 },
    category: [{ type: String, required: true }],
    date: { type: Date, required: true },
    location: { locationSchema },
    attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    groups: [{ type: mongoose.Schema.ObjectId, ref: 'Group' }],
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    comments: [ commentSchema ],
  }
)

const Event = mongoose.model('Event', eventSchema)

export default Event