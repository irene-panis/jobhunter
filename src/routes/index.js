import express from 'express';
const router = express.Router();
import { authenticateToken } from '../utils/auth.js';

import userController from '../controllers/userController.js';
import jobController from '../controllers/jobController.js';

// user routes go here
router.post('/register', userController.register);
router.post('/login', userController.login);

// job routes go here
router.get('/jobs', authenticateToken, jobController.getUserJobs);
router.get('/jobs/:id', jobController.getJobById);
router.post('/jobs', jobController.addJob);
router.put('/jobs/:id', jobController.updateJob);
router.delete('/jobs/:id', jobController.deleteJob);

export default router;