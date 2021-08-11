import express from 'express';
const router = express.Router();

import { get_home, pick_test } from '../controllers/index/home';

router.get('/', get_home);
router.get('/pick-test/:test', pick_test);

export default router;