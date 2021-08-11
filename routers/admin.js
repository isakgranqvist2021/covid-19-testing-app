import express from 'express';
const router = express.Router();

import { get_dashboard } from '../controllers/admin/dashboard';

router.get('/dashboard', get_dashboard);

export default router;