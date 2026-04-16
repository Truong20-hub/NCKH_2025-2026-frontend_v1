const schedules = require("../models/schedules.model");

module.exports = {
  getAll: (req, res) => {
    schedules.getAll((result) => { res.send(result); });
  },
  getById: (req, res) => {
    const id = req.params.id;
    schedules.getById(id, (result) => { res.send(result); });
  },
  insert: (req, res) => {
    const data = req.body;
    schedules.insert(data, (result) => { res.send(result); });
  },
  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    schedules.update(data, id, (result) => { res.send(result); });
  },
  delete: (req, res) => {
    const id = req.params.id;
    schedules.delete(id, (result) => { res.send(result); });
  },
};