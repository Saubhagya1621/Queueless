import express from 'express'
import { getAllServiceCenters, getServiceCenterById, joinQueue, getMyToken, cancelToken } from '../controllers/serviceCenter.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', getAllServiceCenters)
router.get('/:id', getServiceCenterById)
router.post('/join', verifyJWT, joinQueue)
router.get('/token/my-token', verifyJWT, getMyToken)
router.patch('/token/:id/cancel', verifyJWT, cancelToken)

export default router