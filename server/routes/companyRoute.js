import express from 'express';
import { companyController } from '../controllers/companyController.js';
import {stockController} from '../controllers/stockController.js';

const router = express.Router();
router.post('/company', companyController);
router.post('/addstock', stockController);

export default router;