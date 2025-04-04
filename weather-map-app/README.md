# 🌐 Weather Map - Frontend

> 네이버 지도와 공공데이터포털 날씨 API를 연동한 날씨 지도 웹 애플리케이션 (React + TailwindCSS)

---

## 🚀 주요 기능

- 📍 네이버 지도 기반 UI
- 🖱️ 지도 클릭 시 위치별 날씨 정보 요청 (기온, 강수확률, 풍량)
- 🗺️ 클릭한 지역의 행정명(시/군/구) 표시
- 📌 마커 표시 및 위치 추적
- 💅 Glassmorphism 디자인 적용

---

## 🧑‍💻 사용 기술

| 구분 | 기술 |
|------|------|
| 프레임워크 | React 19 |
| 스타일링 | Tailwind CSS 3 |
| 지도 API | Naver Maps JavaScript API v3 |
| 아이콘 | FontAwesome |
| HTTP 통신 | Axios |

---

## 📁 폴더 구조

frontend/ ├── public/ │ └── index.html # Naver Maps API 로딩 (with geocoder) ├── src/ │ ├── components/ │ │ └── NaverMapView.jsx # 네이버 지도 + 마커 + reverse geocoding │ ├── index.js # React 엔트리 │ ├── index.css # Tailwind 적용 │ └── App.js # 전체 UI 및 날씨 요청 로직 ├── tailwind.config.js └── package.json

---

## 🔧 설치 및 실행 방법

1. 의존성 설치

```bash
cd frontend
npm install

2. 개발 서버 실행

npm start

기본 포트는 3000번입니다.

---

## 외부 api
네이버 지도 API: https://navermaps.github.io/maps.js.ncp/docs/

기상청 단기예보 조회서비스 (공공데이터포털): https://www.data.go.kr/data/15084084/openapi.do

## 📬 Backend API 연동
버튼 또는 지도 클릭 시 다음 API로 날씨 정보를 요청합니다:

GET /api/weather/temperature?lat=위도&lon=경도
GET /api/weather/precipitation?lat=위도&lon=경도
GET /api/weather/wind?lat=위도&lon=경도
위 API는 backend에서 처리되며, proxy 설정 또는 포트 일치를 통해 통신해야 합니다.

## 💻 화면 구성 미리보기
헤더: Home, 현재기온, 24시간 강수확률, 풍량 버튼

왼쪽: 날씨 요약 + 선택한 지역명

오른쪽: 네이버 지도 + 마커