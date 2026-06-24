import express from 'express'
import { getAllServiceCenters, getServiceCenterById } from '../controllers/serviceCenter.controller.js'

const router = express.Router()

router.get('/', getAllServiceCenters)
router.get('/:id', getServiceCenterById)

export default router