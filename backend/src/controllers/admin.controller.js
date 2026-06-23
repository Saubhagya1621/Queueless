import ServiceCenter from '../models/serviceCenter.model.js'
import Token from '../models/token.model.js'
import User from '../models/user.model.js'

const getAdminOverview = async (req, res) => {
  try {
    const centers = await ServiceCenter.find()
    const totalWaiting = await Token.countDocuments({ status: 'waiting' })
    const totalServed = await Token.countDocuments({ status: 'served' })
    const totalUsers = await User.countDocuments({ role: 'user' })

    res.status(200).json({
      centers,
      summary: {
        totalWaiting,
        totalServed,
        totalUsers,
        totalCenters: centers.length
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const toggleCounter = async (req, res) => {
  try {
    const { centerId, counterId } = req.params
    const { status } = req.body

    const center = await ServiceCenter.findById(centerId)
    if (!center) return res.status(404).json({ message: 'Service center not found' })

    const counter = center.counters.id(counterId)
    if (!counter) return res.status(404).json({ message: 'Counter not found' })

    counter.status = status
    await center.save()

    res.status(200).json({ message: `Counter ${status} successfully`, counter })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { getAdminOverview, toggleCounter }