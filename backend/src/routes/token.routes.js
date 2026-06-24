import express from 'express'
import { joinQueue, getMyToken, cancelToken } from '../controllers/serviceCenter.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/join', verifyJWT, joinQueue)
router.get('/my-token', verifyJWT, getMyToken)
router.patch('/:id/cancel', verifyJWT, cancelToken)

export default router