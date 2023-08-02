import express from 'express';
import { companyController } from '../controllers/companyController.js';
import {stockController} from '../controllers/stockController.js';
import {watchlistController} from '../controllers/watchlistController.js';
import {deleteinvestController} from '../controllers/deleteinvestController.js';

const router = express.Router();
router.post('/company', companyController);
router.post('/addstock', stockController);
router.post('/watchlist', watchlistController);
router.post('/deleteinvest', deleteinvestController);
export default router;