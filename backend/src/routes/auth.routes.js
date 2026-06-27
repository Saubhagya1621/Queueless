import express from 'express'
import { registerUser, loginUser, logoutUser, googleAuth, googleAuthCallback, getMe } from '../controllers/auth.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

router.get('/google', googleAuth)
router.get('/google/callback', googleAuthCallback)

router.get('/me', verifyJWT, getMe)

export default router