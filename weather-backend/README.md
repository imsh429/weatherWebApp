# 🌐 Weather Map - Backend

> 기상청 단기예보 API (공공데이터포털) 기반 Node.js + Express 백엔드 서버

---

## 🚀 주요 기능

- 📡 공공데이터포털 기상청 단기예보 API 호출 (RESTful)
- 🧭 위도/경도 → 격자(nx, ny) 좌표 변환 포함 (DFS conversion)
- 📊 현재기온, 강수확률, 풍속 정보 제공
- ⚙️ React 프론트엔드와 Axios로 연동 가능

---

## 🧑‍💻 사용 기술

| 항목 | 설명 |
|------|------|
| Runtime | Node.js 18+ |
| 프레임워크 | Express |
| HTTP | Axios |
| 환경변수 | dotenv |

---

## 📁 폴더 구조

backend/ ├── apis/ │ ├── weatherController.js # 날씨 API 처리 로직 (기온, 강수확률, 풍속) │ └── dfsConverter.js # 위경도 → 격자 좌표 변환 함수 ├── routes/ │ └── weatherRoutes.js # /api/weather 라우팅 정의 ├── testServiceKey.js # SERVICE_KEY 테스트용 ├── app.js # Express 서버 설정 ├── .env # 환경변수 (SERVICE_KEY) └── package.json

---

## 🔧 설치 및 실행 방법

1. 의존성 설치

```bash
cd backend
npm install

2. .env 파일 생성

PORT=4000
SERVICE_KEY=여기에_공공데이터포털_디코딩된_API_KEY_입력

3. 서버 실행
node app.js

📡 API 명세
✅ 1. 현재 기온

``` bash
GET /api/weather/temperature?lat=위도&lon=경도

응답:

```bash
{
  "temperatures": [
    { "fcstTime": "1500", "value": "18.3" }
  ]
}
