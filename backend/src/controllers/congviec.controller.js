const Congviec = require("../models/CongviecModel");

exports.createCongviec = async (req, res) => {
  try {
    const { MucTieuId, TieuDe, ThoiGianDuKien } = req.body;

    // Kiểm tra các trường bắt buộc theo ràng buộc NOT NULL trong db.sql
    if (!MucTieuId || !TieuDe) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin MucTieuId hoặc TieuDe.",
      });
    }

    // Kiểm tra khóa ngoại tồn tại trước khi tạo
    const mucTieuExists = await Congviec.checkMucTieuExists(MucTieuId);
    if (!mucTieuExists) {
      return res.status(404).json({
        success: false,
        message: "Lỗi: Mục tiêu (MucTieuId) không tồn tại trong hệ thống.",
      });
    }

    const result = await Congviec.create({
      MucTieuId,
      TieuDe,
      ThoiGianDuKien,
    });

    res.status(201).json({
      success: true,
      message: "Tạo công việc thành công!",
      data: { id: result.insertId, ...req.body },
    });
  } catch (error) {
    // Dự phòng lỗi vi phạm ràng buộc khóa ngoại từ DB (Mã lỗi 1452)
    if (error.errno === 1452) {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ: Mục tiêu liên quan không tồn tại.",
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCongviec = async (req, res) => {
  try {
    const { id } = req.params;
    const { MucTieuId, TieuDe, ThoiGianDuKien, DaHoanThanh } = req.body;

    // Validate các trường bắt buộc
    if (!MucTieuId || !TieuDe) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin MucTieuId hoặc TieuDe.",
      });
    }

    // Tương tự cho cập nhật, kiểm tra nếu MucTieuId thay đổi
    const mucTieuExists = await Congviec.checkMucTieuExists(MucTieuId);
    if (!mucTieuExists) {
      return res.status(404).json({
        success: false,
        message: "Lỗi: Không thể cập nhật vì Mục tiêu mới không tồn tại.",
      });
    }

    const result = await Congviec.update(id, {
      MucTieuId,
      TieuDe,
      ThoiGianDuKien,
      DaHoanThanh,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy công việc để cập nhật.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật công việc thành công!",
    });
  } catch (error) {
    if (error.errno === 1452) {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ: Mục tiêu liên quan không tồn tại.",
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCongviec = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Congviec.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy công việc để xóa.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Xóa công việc thành công!",
    });
  } catch (error) {
    // Mã lỗi 1451: ER_ROW_IS_REFERENCED_2 (Vi phạm ràng buộc khóa ngoại)
    if (error.errno === 1451) {
      return res.status(409).json({
        success: false,
        message:
          "Không thể xóa công việc này vì nó đang có dữ liệu liên quan (nhật ký, lịch trình hoặc kết quả). Hãy xóa các dữ liệu liên quan trước.",
      });
    }

    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchCongviec = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      const results = await Congviec.getAll();
      return res.status(200).json({ success: true, data: results });
    }

    const results = await Congviec.search(keyword);
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllCongviec = async (req, res) => {
  try {
    const results = await Congviec.getAll();
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
