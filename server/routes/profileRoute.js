import express from 'express';
import {profileController} from '../controllers/profileController.js';

const router = express.Router();
router.post('/', profileController);

export default router;