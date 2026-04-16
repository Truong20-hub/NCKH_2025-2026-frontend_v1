const goals = require("../models/goals.model");

module.exports = {
  getAll: (req, res) => {
    goals.getAll((result) => { res.send(result); });
  },
  getById: (req, res) => {
    const id = req.params.id;
    goals.getById(id, (result) => { res.send(result); });
  },
  insert: (req, res) => {
    const data = req.body;
    goals.insert(data, (result) => { res.send(result); });
  },
  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    goals.update(data, id, (result) => { res.send(result); });
  },
  delete: (req, res) => {
    const id = req.params.id;
    goals.delete(id, (result) => { res.send(result); });
  },
};