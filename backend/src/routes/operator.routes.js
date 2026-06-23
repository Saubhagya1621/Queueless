import express from 'express'
import { getQueueByCounter, callNext, skipToken, addWalkIn } from '../controllers/operator.controller.js'
import { verifyJWT, verifyRole } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.use(verifyJWT)
router.use(verifyRole('operator', 'admin'))

router.get('/queue/:counterId', getQueueByCounter)
router.patch('/call-next', callNext)
router.patch('/skip/:id', skipToken)
router.post('/walk-in', addWalkIn)

export default router