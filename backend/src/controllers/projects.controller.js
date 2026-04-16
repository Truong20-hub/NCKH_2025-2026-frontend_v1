const projects = require("../models/projects.model");

module.exports = {
  getAll: (req, res) => {
    projects.getAll((result) => { res.send(result); });
  },
  getById: (req, res) => {
    const id = req.params.id;
    projects.getById(id, (result) => { res.send(result); });
  },
  insert: (req, res) => {
    const data = req.body;
    projects.insert(data, (result) => { res.send(result); });
  },
  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    projects.update(data, id, (result) => { res.send(result); });
  },
  delete: (req, res) => {
    const id = req.params.id;
    projects.delete(id, (result) => { res.send(result); });
  },
};