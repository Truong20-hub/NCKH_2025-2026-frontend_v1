const Muctieu = require("../models/MuctieuModel");

exports.getAll = async (req, res) => {
  try {
    const results = await Muctieu.getAll();
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { NguoiDungId, TieuDe } = req.body;
    if (!NguoiDungId || !TieuDe)
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });

    const exists = await Muctieu.checkNguoiDungExists(NguoiDungId);
    if (!exists)
      return res.status(404).json({ message: "Người dùng không tồn tại" });

    const result = await Muctieu.create(req.body);
    res.status(201).json({ success: true, insertId: result.insertId });
  } catch (error) {
    if (error.errno === 1452)
      return res.status(400).json({ message: "Vi phạm khóa ngoại" });
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await Muctieu.update(req.params.id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Không tìm thấy" });
    res.json({ success: true, message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Muctieu.delete(req.params.id);
    res.json({ success: true, message: "Xóa thành công" });
  } catch (error) {
    if (error.errno === 1451)
      return res
        .status(409)
        .json({
          message: "Mục tiêu này đang chứa các công việc, không thể xóa.",
        });
    res.status(500).json({ message: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const results = await Muctieu.search(req.query.keyword);
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
