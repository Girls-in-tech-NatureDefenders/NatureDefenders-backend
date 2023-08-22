const express = require('express')
const {getAllProjects, getProjectById, createProject} = require('../controllers/projectController')
const route = express.Router();

route.get('/', getAllProjects);
route.get('/:projectId', getProjectById);
route.post('/create', createProject);


module.exports = route
