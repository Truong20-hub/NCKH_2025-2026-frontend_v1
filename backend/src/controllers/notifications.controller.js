const notifications = require("../models/notifications.model");

module.exports = {
  getAll: (req, res) => {
    notifications.getAll((result) => { res.send(result); });
  },
  getById: (req, res) => {
    const id = req.params.id;
    notifications.getById(id, (result) => { res.send(result); });
  },
  insert: (req, res) => {
    const data = req.body;
    notifications.insert(data, (result) => { res.send(result); });
  },
  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    notifications.update(data, id, (result) => { res.send(result); });
  },
  delete: (req, res) => {
    const id = req.params.id;
    notifications.delete(id, (result) => { res.send(result); });
  },
};