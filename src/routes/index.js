const express = require('express');
const router = express.Router();

/* uncomment when we have our routes written out
const userController = require('../controllers/userController');
*/

const jobController = require('../controllers/jobController');

// user routes go here

// job routes go here
router.get('/jobs', jobController.getAllJobs);
router.get('/jobs/:id', jobController.getJobById);
router.post('/jobs', jobController.addJob);
router.put('/jobs/:id', jobController.updateJob);
router.delete('/jobs/:id', jobController.deleteJob);

module.exports = router;