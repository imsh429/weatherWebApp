import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import NaverMapView from "./components/NaverMapView";


function App() {
  const [activeView, setActiveView] = useState("home");

  const renderMapContent = () => {
    switch (activeView) {
      case "temperature":
      case "rain":
      case "wind":
      case "home":
        return <NaverMapView />; // 어떤 뷰든 지금은 동일 지도 보여줌
      default:
        return <div>오류: 알 수 없는 뷰</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-6">
      <div className="backdrop-blur-md bg-white/30 rounded-2xl shadow-lg p-6 max-w-6xl mx-auto">
        {/* ✅ 헤더 */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">🌐 Weather Map</h1>

          {/* ✅ 버튼 영역 */}
          <nav className="flex gap-4">
            <button onClick={() => setActiveView("home")} className="bg-white/70 hover:bg-white text-gray-800 font-semibold py-2 px-4 rounded-full shadow">
              <i className="fas fa-home mr-2"></i> Home
            </button>
            <button onClick={() => setActiveView("temperature")} className="bg-white/70 hover:bg-white text-gray-800 font-semibold py-2 px-4 rounded-full shadow">
              🌡 현재기온
            </button>
            <button onClick={() => setActiveView("rain")} className="bg-white/70 hover:bg-white text-gray-800 font-semibold py-2 px-4 rounded-full shadow">
              🌧 24시간 강수확률
            </button>
            <button onClick={() => setActiveView("wind")} className="bg-white/70 hover:bg-white text-gray-800 font-semibold py-2 px-4 rounded-full shadow">
              🌬 풍량
            </button>
          </nav>
        </header>

        {/* ✅ 본문 */}
        <div className="grid grid-cols-4 gap-6">
          {/* 날씨 요약 */}
          <aside className="col-span-1 backdrop-blur-lg bg-white/40 rounded-xl p-4 text-gray-800">
            <h2 className="text-lg font-semibold mb-2">날씨 요약정보</h2>
            <ul className="space-y-1">
              <li>🌤 현재 날씨: 맑음</li>
              <li>🌡 온도: 22°C</li>
              <li>🌧 강수확률: 30%</li>
              <li>🌬 풍향: 북서</li>
            </ul>
          </aside>

          {/* 지도 화면 */}
          <main className="col-span-3 backdrop-blur-lg bg-white/40 rounded-xl p-4 text-gray-800">
            <h2 className="text-lg font-semibold mb-2">지도 화면</h2>
            <div className="w-full h-96 bg-white/20 rounded-lg flex items-center justify-center text-gray-700 text-xl">
              {/* 버튼에 따라 내용 바뀜 */}
              {renderMapContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
