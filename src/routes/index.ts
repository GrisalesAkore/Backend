import { Router } from 'express';

import userRouter from './user-router';

const router = Router();

// Routes
router.use('/users', userRouter);

export default router;