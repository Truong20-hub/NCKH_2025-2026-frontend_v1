const Ketqua = require("../models/KetquaModel");

exports.getAll = async (req, res) => {
  try {
    const results = await Ketqua.getAll();
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { MucTieuId, NoiDung } = req.body;
    if (!MucTieuId || !NoiDung)
      return res.status(400).json({ message: "Thiếu thông tin" });

    const exists = await Ketqua.checkMucTieuExists(MucTieuId);
    if (!exists)
      return res.status(404).json({ message: "Mục tiêu không tồn tại" });

    const result = await Ketqua.create(req.body);
    res.status(201).json({ success: true, insertId: result.insertId });
  } catch (error) {
    if (error.errno === 1452)
      return res.status(400).json({ message: "Mục tiêu không tồn tại (DB)" });
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await Ketqua.update(req.params.id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Không tìm thấy" });
    res.json({ success: true, message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Ketqua.delete(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Không tìm thấy" });
    res.json({ success: true, message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const results = await Ketqua.search(req.query.keyword);
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
