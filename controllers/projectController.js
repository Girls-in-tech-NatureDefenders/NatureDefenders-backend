const { project } = require("../models/projectModel");
const { User } = require("../models/userModel");

module.exports.getAllProjects = async (req, res) => {
    try {
      const projects = await Project.find();
      res.status(200).json(projects);
    } catch (error) {
      res.status(400).json({ error: 'cannot find projects' });
    }
  }

module.exports.getProjectById = async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      res.status(400).json({ error: 'Failed to retrieve project' });
    }
  }

  module.exports.createProject = async (req, res) => {
    const { 
      companyName, 
      companyLocations, 
      contactInformation, 
      teamBackground,
      projectTitle,
      projectDescription,
      preventiveMeasures,
      habitationRestoration,
      pictureUrl,
      acceptableCurrency,
      walletAddress,
      estimatedAmount,
      fundingGoals
    } = req.body;

    try {
      const userId = req.user.id;

      const project =  await Project.create({
        companyName, 
        companyLocations, 
        contactInformation, 
        teamBackground,
        projectTitle,
        projectDescription,
        preventiveMeasures,
        habitationRestoration,
        pictureUrl,
        acceptableCurrency,
        walletAddress,
        estimatedAmount,
        fundingGoals,
        createdBy: userId 
      });
      res.status(201).json(project);

    } catch (error) {
      res.status(400).json({ error: 'cannot create project' });
    }
  }

