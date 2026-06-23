import mongoose from 'mongoose'

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  currentToken: { type: Number, default: 0 }
})

const serviceCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, enum: ['hospital', 'bank', 'government', 'other'], default: 'other' },
  counters: [counterSchema],
  totalWaiting: { type: Number, default: 0 }
}, { timestamps: true })

const ServiceCenter = mongoose.model('ServiceCenter', serviceCenterSchema)
export default ServiceCenter