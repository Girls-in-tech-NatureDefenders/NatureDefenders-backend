const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyLocation: {
        type: String,
        required: true
    },
    contactInformation: {
        type: String,
        required: true
    },
    teamBackground: {
        type: String,
        required: false
    },
    projectTitle: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    preventiveMeasures: {
        type: String,
        required: false
    },
    habitationRestoration: {
        type: String,
        required: false
    },
    pictureUrl: {
        type: String,
        required: true
    },
    acceptableCurrency: {
        type: String,
        required: true
    },
    walletAddress: {
        type: String,
        required: true
    },
    estimatedAmount: {
        type: Number,
        required: true
    },
    fundingGoals: {
        type: Number,
        required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

});

const Project = mongoose.model("project", projectSchema);

module.exports = { Project };