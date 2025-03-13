const bcrypt = require("bcryptjs");
const db = require("../config/db"); // ✅ MySQL 연결 (Supabase 사용 시 require("../config/supabase"))

async function encryptExistingPasswords() {
  try {
    console.log("🔒 기존 사용자들의 비밀번호를 암호화 중...");

    // ✅ 1. 기존 사용자들의 비밀번호 조회
    const [users] = await db.query(
      "SELECT id, password FROM users WHERE password IS NOT NULL"
    );

    if (!users.length) {
      console.log(
        "✅ 모든 비밀번호가 이미 암호화되어 있거나 비밀번호가 없습니다."
      );
      return;
    }

    // ✅ 2. 모든 사용자의 비밀번호를 암호화하여 업데이트
    for (const user of users) {
      if (!user.password) continue; // NULL 값은 스킵

      // ✅ 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(user.password, 10); // 10 = saltRounds

      // ✅ DB 업데이트
      await db.query("UPDATE users SET password = ? WHERE id = ?", [
        hashedPassword,
        user.id,
      ]);
    }

    console.log("모든 기존 비밀번호가 안전하게 암호화되었습니다.");
    process.exit(); // 실행 후 종료
  } catch (err) {
    console.error("비밀번호 암호화 중 오류 발생:", err);
    process.exit(1);
  }
}

// 실행
encryptExistingPasswords();
