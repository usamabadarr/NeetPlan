import { Router } from "express";
import eventRoutes from './event-routes.js';
import userRoutes from './user-routes.js';
import weatherRoutes from './weather-routes.js';
const router = Router();
router.use('/event', eventRoutes);
router.use('/user', userRoutes);
router.use('/weather', weatherRoutes);
export default router;
