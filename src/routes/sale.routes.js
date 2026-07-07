import express from 'express';
import saleController from '../controllers/sale.controller.js';

const router = express.Router();

router.get('/', saleController.getAllSales);

router.post('/', saleController.createSale);

export default router;
