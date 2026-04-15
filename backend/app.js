const express = require("express");
require("dotenv").config();
const cors = require("cors");
// const quizRoutes = require("./routes/quiz.routes");

// const vocabRoutes = require("./routes/vocab.routes");
const congviecRoutes = require("./src/routes/congviec.route");
const goiyaiRoutes = require("./src/routes/goiyai.route");
const ketquaRoutes = require("./src/routes/ketqua.route");
const khunggioRoutes = require("./src/routes/khunggio.route");
const lichRoutes = require("./src/routes/lich.route");
const muctieuRoutes = require("./src/routes/muctieu.route");
const nhatkytiendoRoutes = require("./src/routes/nhatkytiendo.route");
const nguoidungRoutes = require("./src/routes/nguoidung.route");
const thongbaoRoutes = require("./src/routes/thongbao.route");
const chatRoute = require("./src/routes/chatRoute");
const app = express();

app.use(cors());
app.use(express.json());
// app.use("/api/vocab", vocabRoutes);
// app.use("/api/quiz", quizRoutes);
app.use("/api/congviec", congviecRoutes);
app.use("/api/goiyai", goiyaiRoutes);
app.use("/api/ketqua", ketquaRoutes);
app.use("/api/khunggio", khunggioRoutes);
app.use("/api/lich", lichRoutes);
app.use("/api/muctieu", muctieuRoutes);
app.use("/api/nhatkytiendo", nhatkytiendoRoutes);
app.use("/api/nguoidung", nguoidungRoutes);
app.use("/api/thongbao", thongbaoRoutes);
app.use("/api/chat", chatRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

module.exports = app;
