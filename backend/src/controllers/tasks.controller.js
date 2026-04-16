const tasks = require("../models/tasks.model");

module.exports = {
  getAll: (req, res) => {
    tasks.getAll((result) => { res.send(result); });
  },
  getById: (req, res) => {
    const id = req.params.id;
    tasks.getById(id, (result) => { res.send(result); });
  },
  insert: (req, res) => {
    const data = req.body;
    tasks.insert(data, (result) => { res.send(result); });
  },
  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    tasks.update(data, id, (result) => { res.send(result); });
  },
  delete: (req, res) => {
    const id = req.params.id;
    tasks.delete(id, (result) => { res.send(result); });
  },
};