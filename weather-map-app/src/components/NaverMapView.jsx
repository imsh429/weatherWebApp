// src/components/NaverMapView.jsx
import React, { useEffect, useRef } from "react";

function NaverMapView() {
  const mapRef = useRef(null);

  useEffect(() => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.5665, 126.9780), // 서울
      zoom: 10,
    };

    const map = new window.naver.maps.Map(mapRef.current, mapOptions);
  }, []);

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
}

export default NaverMapView;
