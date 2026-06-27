import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: {
    type: String,
    required: function() {
      // Phone is only required for non-Google signups
      // Google users will be asked to add it later in the app
      return !this.googleId
    }
  },
  password: {
    type: String,
    required: function() {
      // Password is only required for non-Google signups
      return !this.googleId
    }
  },
  googleId: { type: String, unique: true, sparse: true },
  role: { type: String, enum: ['user', 'operator', 'admin'], default: 'user' },
  serviceCenterId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCenter', default: null },
  counterId: { type: mongoose.Schema.Types.ObjectId, default: null }
}, { timestamps: true })

userSchema.pre('save', async function() {
  if (!this.isModified('password') || !this.password) return
  this.password = await bcryptjs.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcryptjs.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)
export default User