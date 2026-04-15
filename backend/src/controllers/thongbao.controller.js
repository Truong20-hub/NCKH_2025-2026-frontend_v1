const Thongbao = require("../models/ThongbaoModel");

exports.getAll = async (req, res) => {
  try {
    const results = await Thongbao.getAll();
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { NguoiDungId, NoiDung } = req.body;
    if (!NguoiDungId || !NoiDung)
      return res.status(400).json({ message: "Thiếu thông tin" });

    const exists = await Thongbao.checkNguoiDungExists(NguoiDungId);
    if (!exists)
      return res.status(404).json({ message: "Người dùng không tồn tại" });

    const result = await Thongbao.create(req.body);
    res.status(201).json({ success: true, insertId: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await Thongbao.update(req.params.id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Không tìm thấy thông báo" });
    res.json({ success: true, message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Thongbao.delete(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Không tìm thấy" });
    res.json({ success: true, message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const results = await Thongbao.search(req.query.keyword);
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
