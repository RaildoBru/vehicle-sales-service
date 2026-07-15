import express from 'express';

import healthRoutes from './health.routes.js';
import salesRoutes from './sale.routes.js';
import webhookRoutes from './webhook.routes.js';

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/sales', salesRoutes);
router.use('/webhooks', webhookRoutes);

export default router;
