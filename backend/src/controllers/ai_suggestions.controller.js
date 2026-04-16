const ai_suggestions = require("../models/ai_suggestions.model");

module.exports = {
  getAll: (req, res) => {
    ai_suggestions.getAll((result) => { res.send(result); });
  },
  getById: (req, res) => {
    const id = req.params.id;
    ai_suggestions.getById(id, (result) => { res.send(result); });
  },
  insert: (req, res) => {
    const data = req.body;
    ai_suggestions.insert(data, (result) => { res.send(result); });
  },
  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    ai_suggestions.update(data, id, (result) => { res.send(result); });
  },
  delete: (req, res) => {
    const id = req.params.id;
    ai_suggestions.delete(id, (result) => { res.send(result); });
  },
};