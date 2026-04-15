const express = require("express");
const router = express.Router();

const controller = require("../controllers/nhatkytiendo.controller");

router.get("/", controller.getAll);
router.get("/search", controller.search);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
