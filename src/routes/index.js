import express from 'express';
const router = express.Router();
import { authenticateToken } from '../utils/auth.js';

import userController from '../controllers/userController.js';
import jobController from '../controllers/jobController.js';

// user routes go here
router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/update/:id', authenticateToken, userController.updateUser);
router.delete('/delete/:id', authenticateToken, userController.deleteUser)

// job routes go here
router.get('/jobs/all', authenticateToken, jobController.getUserJobs);
router.get('/jobs/recent', authenticateToken, jobController.getRecentJobs);
router.get('/jobs/interviews', authenticateToken, jobController.getInterviews);
router.get('/jobs/next-interview', authenticateToken, jobController.getNextInterview);
router.get('/jobs/counts', authenticateToken, jobController.getAppCounts);
router.post('/jobs', authenticateToken, jobController.addJob);
router.put('/jobs/:id', authenticateToken, jobController.updateJob);
router.delete('/jobs/:id', authenticateToken, jobController.deleteJob);

export default router;