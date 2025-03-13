# 📌 설치 패키지 정리

## version

- mysql : 8.4.4

## express

**설명**: Node.js를 위한 웹 애플리케이션 프레임워크로, 서버를 쉽게 구성할 수 있도록 도와줍니다.  
**사용 예**: REST API 개발, 라우팅, 미들웨어 처리.  
**설치 명령어**:

```sh
npm install express
```

---

## mysql2

**설명**: MySQL 데이터베이스와 연결하고 SQL 쿼리를 실행할 수 있도록 지원하는 라이브러리입니다.  
**사용 예**: MySQL 연결 및 데이터 조회, 삽입, 업데이트.  
**설치 명령어**:

```sh
npm install mysql2
```

---

## dotenv

**설명**: `.env` 파일에서 환경 변수를 로드하는 라이브러리입니다.  
**사용 예**: 데이터베이스 접속 정보, API 키 등의 민감한 정보를 관리.  
**설치 명령어**:

```sh
npm install dotenv
```

---

## bcryptjs

**설명**: 비밀번호 암호화를 위한 라이브러리입니다.  
**사용 예**: 사용자 비밀번호를 안전하게 해싱하여 저장할 때.  
**설치 명령어**:

```sh
npm install bcryptjs
```

---

## body-parser

**설명**: Express에서 요청 바디를 JSON 또는 URL-encoded 형태로 파싱하는 미들웨어입니다.  
**사용 예**: 클라이언트가 보낸 데이터를 `req.body`를 통해 읽을 때.  
**설치 명령어**:

```sh
npm install body-parser
```

---

## cors

**설명**: CORS(Cross-Origin Resource Sharing)를 활성화하여 다른 도메인에서 서버에 요청할 수 있도록 설정하는 라이브러리입니다.  
**사용 예**: 프론트엔드와 백엔드가 서로 다른 도메인일 때 허용.  
**설치 명령어**:

```sh
npm install cors
```

---

## nodemon (개발 환경 전용)

**설명**: 코드가 변경될 때마다 자동으로 서버를 재시작해주는 개발 도구입니다.  
**사용 예**: 개발 중 코드 변경 시 자동 반영.  
**설치 명령어**:

```sh
npm install --save-dev nodemon
```

---

## 🔥 실행 방법

1️⃣ **패키지 설치**

```sh
npm install
```

2️⃣ **환경 변수 설정 (`.env` 파일 생성)**

```sh
touch .env
```

`.env` 파일 예시:

```env
PORT=3000
DB_HOST=localhost
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=mydatabase
```

3️⃣ **서버 실행**

```sh
npm start
```

또는 개발 모드에서 실행:

```sh
npm run dev
```

✅ **서버가 정상적으로 실행되면**  
`서버 실행 중: http://localhost:3000` 메시지가 출력됩니다.

---

## TABLES

```SQL
-- user TABLE
-- PostgreSQL이나 SQL Server에서는 NULL을 중복값으로 간주하여 두 번째 NULL 삽입 시 오류 발생 MYSQL은 괜찮다고 함
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,  -- 이메일 (소셜 로그인 시 NULL 가능)
    password VARCHAR(255),  -- 일반 로그인 시 사용 (소셜 로그인은 NULL)
    social_id VARCHAR(255) UNIQUE,  -- 소셜 로그인 ID (ex: Google, Kakao 등)
    provider VARCHAR(50) NOT NULL DEFAULT 'local',  -- 로그인 방식
    profile_image TEXT,  -- 프로필 이미지 URL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 가입일
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 마지막 정보 수정일
    last_login TIMESTAMP NULL,  -- 마지막 로그인 시간
    deleted_at TIMESTAMP NULL  -- 계정 삭제 시각 (soft delete)
);

INSERT INTO users (username, email, password, provider, social_id, profile_image)
VALUES ('testuser2', NULL, 'hashedpassword123', 'google', 'google_123456789', 'https://example.com/avatar.png');


```

postgresql

## mysql에서 uuid 디폴트 값이 안돼서 트리거 거는 코드

DELIMITER //
CREATE TRIGGER before_insert_users
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
IF NEW.id IS NULL THEN
SET NEW.id = UUID();
END IF;
END;
//
DELIMITER ;
