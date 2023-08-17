const express = require('express')
const projectController = require('../controllers/projectController')
const route = express.Router();

route.get('/', projectController.getAllProjects);
route.get('/:projectId', projectController.getProjectById);
route.post('/', projectController.createProject);


module.exports = route
