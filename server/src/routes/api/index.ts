import { Router } from "express";
import eventRoutes from './event-route.js'

const router = Router()

router.use('/event', eventRoutes)

export default router