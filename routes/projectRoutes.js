const express = require('express')
const {getAllProjects, getProjectById, createProject} = require('../controllers/projectController');
const { requireAuth, authorizeAdmin } = require('../middleware/auth');

const route = express.Router();

route.get('/', getAllProjects);
route.get('/:projectId', getProjectById);

// Use requireAuth middleware for routes that require authentication
route.use(requireAuth);

route.post('/create', authorizeAdmin, createProject);


module.exports = route
