const express = require("express");
const router = express.Router();
const congviecController = require("../controllers/congviec.controller");

// Endpoint: POST /api/congviec
router.post("/", congviecController.createCongviec);

// Endpoint: GET /api/congviec/search
router.get("/search", congviecController.searchCongviec);

// Endpoint: PUT /api/congviec/:id
router.put("/:id", congviecController.updateCongviec);

// Endpoint: DELETE /api/congviec/:id - Chặn nếu vi phạm khóa ngoại
router.delete("/:id", congviecController.deleteCongviec);

// Endpoint: GET /api/congviec
router.get("/", congviecController.getAllCongviec);

module.exports = router;
