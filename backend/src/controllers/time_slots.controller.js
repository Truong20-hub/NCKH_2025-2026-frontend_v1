const time_slots = require("../models/time_slots.model");

module.exports = {
  getAll: (req, res) => {
    time_slots.getAll((result) => { res.send(result); });
  },
  getById: (req, res) => {
    const id = req.params.id;
    time_slots.getById(id, (result) => { res.send(result); });
  },
  insert: (req, res) => {
    const data = req.body;
    time_slots.insert(data, (result) => { res.send(result); });
  },
  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    time_slots.update(data, id, (result) => { res.send(result); });
  },
  delete: (req, res) => {
    const id = req.params.id;
    time_slots.delete(id, (result) => { res.send(result); });
  },
};