import jwt from 'jsonwebtoken'

const generateToken = (userId, role, serviceCenterId = null, counterId = null) => {
  return jwt.sign(
    { userId, role, serviceCenterId, counterId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export default generateToken