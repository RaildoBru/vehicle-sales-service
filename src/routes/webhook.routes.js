import express from 'express';
import webhookController from '../controllers/payment.webhook.controller.js';

const router = express.Router();

router.post('/payment', webhookController.handle);

export default  router;
