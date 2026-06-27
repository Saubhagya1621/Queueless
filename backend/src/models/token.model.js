import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
  // Optional now — walk-in customers don't have a User account,
  // so this stays null for them and their name is stored in walkInName instead.
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  walkInName: { type: String, default: null },
  serviceCenterId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCenter', required: true },
  counterId: { type: mongoose.Schema.Types.ObjectId, required: true },
  tokenNumber: { type: Number, required: true },
  position: { type: Number, required: true },
  status: { type: String, enum: ['waiting', 'called', 'served', 'skipped', 'cancelled'], default: 'waiting' },
  estimatedWait: { type: Number, default: 0 },
  operatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
}, { timestamps: true })

const Token = mongoose.model('Token', tokenSchema)
export default Token