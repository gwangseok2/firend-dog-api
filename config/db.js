require("dotenv").config();
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
  } else {
    console.log("MySQL 연결 성공");
    connection.release();
  }
});

module.exports = db;

// require("dotenv").config();
// const mysql = require("mysql2/promise"); // ✅ 'mysql2/promise' 사용

// // ✅ MySQL 연결 풀(Pool) 생성 (Promise 기반)
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // ✅ MySQL 연결 테스트
// async function testDBConnection() {
//   try {
//     const connection = await pool.getConnection();
//     console.log("✅ MySQL 연결 성공");
//     connection.release(); // 연결 해제
//   } catch (err) {
//     console.error("❌ MySQL 연결 실패:", err);
//   }
// }
// testDBConnection();

// module.exports = pool; // ✅ 이제 `await db.query()`를 사용할 수 있음!
