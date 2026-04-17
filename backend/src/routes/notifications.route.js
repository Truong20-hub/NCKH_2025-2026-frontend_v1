const express = require('express');
const controller = require('../controllers/notifications.controller');
const router = express.Router();

// Lấy danh sách tất cả
router.get('/', controller.getAll);

// Lấy thông báo theo ID người dùng (Quan trọng nhất)
router.get('/user/:userId', controller.getByUserId);

// Lấy chi tiết theo ID thông báo
router.get('/:id', controller.getById);

// Thêm mới
router.post('/', controller.insert);

// Cập nhật (Ví dụ: đánh dấu đã đọc)
router.put('/:id', controller.update);

// Xóa
router.delete('/:id', controller.delete);

module.exports = router;