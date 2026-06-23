import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'operator', 'admin'], default: 'user' }
}, { timestamps: true })

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return
  this.password = await bcryptjs.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcryptjs.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)
export default User