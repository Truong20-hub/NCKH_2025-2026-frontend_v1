const progress_logs = require("../models/progress_logs.model");

module.exports = {
  getAll: (req, res) => {
    progress_logs.getAll((result) => { res.send(result); });
  },
  getById: (req, res) => {
    const id = req.params.id;
    progress_logs.getById(id, (result) => { res.send(result); });
  },
  insert: (req, res) => {
    const data = req.body;
    progress_logs.insert(data, (result) => { res.send(result); });
  },
  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    progress_logs.update(data, id, (result) => { res.send(result); });
  },
  delete: (req, res) => {
    const id = req.params.id;
    progress_logs.delete(id, (result) => { res.send(result); });
  },
};