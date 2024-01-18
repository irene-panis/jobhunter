const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../utils/auth');

const userController = require('../controllers/userController');
const jobController = require('../controllers/jobController');

// user routes go here
router.post('/register', userController.register);
router.post('/login', userController.login);

// job routes go here
router.get('/jobs', authenticateToken, jobController.getUserJobs);
router.get('/jobs/:id', jobController.getJobById);
router.post('/jobs', jobController.addJob);
router.put('/jobs/:id', jobController.updateJob);
router.delete('/jobs/:id', jobController.deleteJob);

module.exports = router;