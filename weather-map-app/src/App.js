import React, { useState } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import NaverMapView from "./components/NaverMapView";

function App() {
  const [activeView, setActiveView] = useState("home");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lat, setLat] = useState(37.5665); // 서울
  const [lon, setLon] = useState(126.9780);
  const [locationName, setLocationName] = useState("");
  const [resetMap, setResetMap] = useState(false); // ✅ 지도 초기화 플래그

  // ✅ 날씨 API 요청
  const fetchWeatherData = async (type, lat, lon) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`/api/weather/${type}`, {
        params: { lat, lon },
      });
      setWeatherData(res.data);
    } catch (err) {
      console.error("❌ axios 통신 오류:", err.message);
      setError("날씨 데이터를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 지도 클릭 시 위치 정보 수신
  const handleLocationClick = ({ lat, lon, locationName }) => {
    setLat(lat);
    setLon(lon);
    setLocationName(locationName);
    setResetMap(false); // 클릭 시 초기화 모드 종료

    if (["temperature", "precipitation", "wind"].includes(activeView)) {
      fetchWeatherData(activeView, lat, lon);
    }
  };

  // ✅ 버튼 클릭 시 뷰 전환
  const handleViewChange = async (view) => {
    setActiveView(view);
    if (view === "home") {
      setWeatherData(null);
      setLocationName("");
      setResetMap(true); // ✅ 지도 초기화
    } else {
      await fetchWeatherData(view, lat, lon);
    }
  };

  // ✅ 지도 컴포넌트 렌더링
  const renderMapContent = () => {
    return (
      <NaverMapView
        onLocationClick={handleLocationClick}
        reset={resetMap}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-6">
      <div className="backdrop-blur-md bg-white/30 rounded-2xl shadow-lg p-6 max-w-6xl mx-auto">
        {/* ✅ 헤더 */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">🌐 Weather Map</h1>

          <nav className="flex gap-4">
            <button
              onClick={() => handleViewChange("home")}
              className="bg-white/70 hover:bg-white text-gray-800 font-semibold py-2 px-4 rounded-full shadow"
            >
              <i className="fas fa-home mr-2"></i> Home
            </button>
            <button
              onClick={() => handleViewChange("temperature")}
              className="bg-white/70 hover:bg-white text-gray-800 font-semibold py-2 px-4 rounded-full shadow"
            >
              🌡 현재기온
            </button>
            <button
              onClick={() => handleViewChange("precipitation")}
              className="bg-white/70 hover:bg-white text-gray-800 font-semibold py-2 px-4 rounded-full shadow"
            >
              🌧 24시간 강수확률
            </button>
            <button
              onClick={() => handleViewChange("wind")}
              className="bg-white/70 hover:bg-white text-gray-800 font-semibold py-2 px-4 rounded-full shadow"
            >
              🌬 풍량
            </button>
          </nav>
        </header>

        {/* ✅ 본문 */}
        <div className="grid grid-cols-4 gap-6">
          {/* 요약 정보 */}
          <aside className="col-span-1 backdrop-blur-lg bg-white/40 rounded-xl p-4 text-gray-800">
            <h2 className="text-lg font-semibold mb-2">
              날씨 요약정보
              {locationName && (
                <span className="block text-sm text-gray-600 mt-1">
                  📍 {locationName}
                </span>
              )}
            </h2>

            {loading && <p>⏳ 불러오는 중...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && !error && activeView === "temperature" && weatherData?.temperatures && (
              <ul className="space-y-1">
                <li>🌡 현재 온도: {weatherData.temperatures[0].value}°C</li>
              </ul>
            )}
            {!loading && !error && activeView === "precipitation" && weatherData?.precipitation && (
              <ul className="space-y-1">
                <li>🌧 강수확률: {weatherData.precipitation[0].value}%</li>
              </ul>
            )}
            {!loading && !error && activeView === "wind" && weatherData?.wind && (
              <ul className="space-y-1">
                <li>🌬 풍속: {weatherData.wind[0].value} m/s</li>
              </ul>
            )}

            {activeView === "home" && <p>🏠 버튼을 눌러 날씨 정보를 확인하세요.</p>}
          </aside>

          {/* 지도 영역 */}
          <main className="col-span-3 backdrop-blur-lg bg-white/40 rounded-xl p-4 text-gray-800">
            <h2 className="text-lg font-semibold mb-2">지도 화면</h2>
            <div className="w-full h-96 bg-white/20 rounded-lg overflow-hidden">
              {renderMapContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
