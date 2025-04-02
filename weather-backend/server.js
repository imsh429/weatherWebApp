require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우터 연결
const weatherRouter = require("./routes/weather");
app.use("/api/weather", weatherRouter);

// 서버 시작
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});