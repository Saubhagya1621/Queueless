import express from 'express'
import { getAdminOverview, toggleCounter, getOperatorScorecard } from '../controllers/admin.controller.js'
import { verifyJWT, verifyRole } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.use(verifyJWT)
router.use(verifyRole('admin'))

router.get('/overview', getAdminOverview)
router.patch('/counter/:centerId/:counterId', toggleCounter)
router.get('/scorecard', getOperatorScorecard)

export default router