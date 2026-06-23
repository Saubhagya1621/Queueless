import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceCenterId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCenter', required: true },
  counterId: { type: mongoose.Schema.Types.ObjectId, required: true },
  tokenNumber: { type: Number, required: true },
  position: { type: Number, required: true },
  status: { type: String, enum: ['waiting', 'called', 'served', 'skipped', 'cancelled'], default: 'waiting' },
  estimatedWait: { type: Number, default: 0 }
}, { timestamps: true })

const Token = mongoose.model('Token', tokenSchema)
export default Token