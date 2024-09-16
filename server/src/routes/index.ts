import { Router } from 'express';
import authRoutes from './auth-routes'
import apiRoutes from './api/index.js'
import authentication from '../middleware/auth.js'
const router = Router();

// create routes for authentication and for api calls

router.use('/auth', authRoutes);
router.use('/api', authentication, apiRoutes)

export default router;
