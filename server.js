require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

// MySQL 연결 실행
require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

// CORS 미들웨어 추가
app.use(
  cors({
    origin: "http://localhost:3000", // Next.js 주소
    credentials: true,
  })
);

// 미들웨어 설정
app.use(bodyParser.json());

// API 라우트 설정
app.use("/api/users", userRoutes);
// 추가예정 auth, post .... 등

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
