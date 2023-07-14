import express from 'express';
import {profileController,  closevalueController} from '../controllers/profileController.js';

const router = express.Router();
router.post('/', profileController);
router.post('/close', closevalueController);

export default router;