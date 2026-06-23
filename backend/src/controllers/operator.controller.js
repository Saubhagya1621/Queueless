import Token from '../models/token.model.js'
import ServiceCenter from '../models/serviceCenter.model.js'
import { io } from '../index.js'

const getQueueByCounter = async (req, res) => {
  try {
    const { counterId } = req.params
    const tokens = await Token.find({ counterId, status: 'waiting' })
      .populate('userId', 'name phone')
      .sort({ position: 1 })
    res.status(200).json({ tokens })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const callNext = async (req, res) => {
  try {
    const { counterId } = req.body

    const current = await Token.findOne({ counterId, status: 'called' })
    if (current) {
      current.status = 'served'
      await current.save()
      await ServiceCenter.findOneAndUpdate(
        { 'counters._id': counterId },
        { $inc: { totalWaiting: -1 } }
      )
    }

    const next = await Token.findOne({ counterId, status: 'waiting' })
      .sort({ position: 1 })
    if (!next) return res.status(404).json({ message: 'No more tokens in queue' })

    next.status = 'called'
    await next.save()

    io.to(next.serviceCenterId.toString()).emit('queue:updated', { counterId })
    io.to(next.serviceCenterId.toString()).emit('token:called', { tokenId: next._id, userId: next.userId })

    res.status(200).json({ message: 'Next token called', token: next })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const skipToken = async (req, res) => {
  try {
    const token = await Token.findById(req.params.id)
    if (!token) return res.status(404).json({ message: 'Token not found' })

    token.status = 'skipped'
    await token.save()

    await ServiceCenter.findOneAndUpdate(
      { 'counters._id': token.counterId },
      { $inc: { totalWaiting: -1 } }
    )

    io.to(token.serviceCenterId.toString()).emit('queue:updated', { counterId: token.counterId })

    res.status(200).json({ message: 'Token skipped' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addWalkIn = async (req, res) => {
  try {
    const { serviceCenterId, counterId } = req.body

    const center = await ServiceCenter.findById(serviceCenterId)
    const counter = center.counters.id(counterId)

    const waitingCount = await Token.countDocuments({ counterId, status: 'waiting' })

    const token = await Token.create({
      userId: req.user.userId,
      serviceCenterId,
      counterId,
      tokenNumber: counter.currentToken + 1,
      position: waitingCount + 1,
      estimatedWait: (waitingCount + 1) * 5,
      status: 'waiting'
    })

    counter.currentToken += 1
    center.totalWaiting += 1
    await center.save()

    io.to(serviceCenterId.toString()).emit('queue:updated', { counterId })

    res.status(201).json({ message: 'Walk-in added successfully', token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { getQueueByCounter, callNext, skipToken, addWalkIn }