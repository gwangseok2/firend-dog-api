const mysql = require("mysql2/promise");
require("dotenv").config();

async function seedDatabase() {
  try {
    console.log("데이터베이스 및 테이블 시딩 시작...");

    // MySQL과 연결 (데이터베이스 없이 root 계정으로 연결)
    const connection = await mysql.createConnection({
      host: "127.0.0.1", // IPv4 주소 사용
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      multipleStatements: true, //  여러 개의 SQL 실행 가능
    });

    // 데이터베이스 생성 (존재하지 않으면 생성)
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`
    );
    console.log(` 데이터베이스 ${process.env.DB_NAME} 생성 완료`);

    // 데이터베이스 사용
    await connection.query(`USE \`${process.env.DB_NAME}\`;`);

    // 기존 users 테이블 삭제 후 재생성
    await connection.query(`DROP TABLE IF EXISTS users;`);
    await connection.query(`
      CREATE TABLE users (
          user_no INT AUTO_INCREMENT PRIMARY KEY,
          id CHAR(36) NOT NULL DEFAULT (UUID()),  --  UUID 기본값 설정
          user_name VARCHAR(50) NOT NULL,
          email VARCHAR(100) UNIQUE,
          phone_number VARCHAR(20) UNIQUE NULL,
          password VARCHAR(255),
          social_id VARCHAR(255) UNIQUE,
          provider VARCHAR(50) NOT NULL DEFAULT 'local',
          profile_image TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          last_login TIMESTAMP NULL,
          deleted_at TIMESTAMP NULL
      );
    `);
    console.log(" users 테이블 생성 완료");

    //  기본 데이터 삽입 (id는 자동으로 UUID가 생성됨)
    await connection.query(`
        INSERT INTO users (user_name, email, phone_number, password, provider) VALUES
        ('admin', 'admin@example.com', '01012345678', 'hashedpassword', 'local'),
        ('testuser', 'test@example.com', '01098765432', 'hashedpassword', 'local'),
        ('socialuser', NULL, '01055556666', NULL, 'google');
    `);

    console.log("기본 데이터 삽입 완료");
    await connection.end(); //  연결 종료
    process.exit(); // 실행 후 종료
  } catch (err) {
    console.error("데이터베이스 시딩 실패:", err);
    process.exit(1);
  }
}

//  실행
seedDatabase();
