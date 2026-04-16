const db = require("../common/db");

const AISuggestions = function (item) {
  this.id = item.id;
  this.user_id = item.user_id;
  this.goal_id = item.goal_id;
  this.content = item.content;
  this.is_applied = item.is_applied;
  this.created_at = item.created_at;
};

AISuggestions.getById = (id, callback) => {
  const sqlString = "SELECT * FROM ai_suggestions WHERE id = ? ";
  db.query(sqlString, [id], (err, result) => {
    if (err) return callback(err);
    // Trả về null nếu không tìm thấy để controller dễ xử lý
    callback(result.length > 0 ? result[0] : null);
  });
};

AISuggestions.getAll = (callback) => {
  const sqlString = "SELECT * FROM ai_suggestions ";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

AISuggestions.insert = (data, callBack) => {
  const sqlString = "INSERT INTO ai_suggestions SET ?";
  db.query(sqlString, data, (err, res) => {
    if (err) return callBack(err);
    callBack({ id: res.insertId, ...data });
  });
};

AISuggestions.update = (data, id, callBack) => {
  const sqlString = "UPDATE ai_suggestions SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => {
    if (err) return callBack(err);
    callBack("Cập nhật ai_suggestions id = " + id + " thành công");
  });
};

AISuggestions.delete = (id, callBack) => {
  db.query("DELETE FROM ai_suggestions WHERE id = ?", [id], (err, res) => {
    if (err) return callBack(err);
    callBack("Xóa ai_suggestions id = " + id + " thành công");
  });
};

module.exports = AISuggestions;