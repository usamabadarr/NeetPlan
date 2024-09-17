import { Router } from "express";
import eventRoutes from './event-routes.js';
import userRoutes from './user-routes.js';
const router = Router();
router.use('/event', eventRoutes);
router.use('/user', userRoutes);
export default router;
