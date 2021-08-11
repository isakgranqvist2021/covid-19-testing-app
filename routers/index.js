import express from 'express';
const router = express.Router();

import { get_home } from '../controllers/index/home';

router.get('/', get_home);

export default router;