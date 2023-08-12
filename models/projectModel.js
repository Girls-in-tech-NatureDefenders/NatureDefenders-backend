const  mongoose  = require("mongoose");

const projectSchema = new mongoose.Schema({
companyName:{ 
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
    required: true 
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
    required: true 
},
  habitationRestoration: { 
    type: String, 
    required: true 
},
  pictureUrl: { 
    type: String 
}
});

const Project = mongoose.model("project", userSchema);

module.exports = {project}