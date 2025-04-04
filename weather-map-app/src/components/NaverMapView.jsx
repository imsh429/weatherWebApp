import React, { useEffect, useRef } from "react";

function NaverMapView({ onLocationClick }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null); // ✅ 마커 상태를 저장할 ref

  useEffect(() => {
    const { naver } = window;
    const center = new naver.maps.LatLng(37.5665, 126.9780);

    const map = new naver.maps.Map(mapRef.current, {
      center,
      zoom: 7,
    });

    // ✅ 지도 클릭 이벤트
    naver.maps.Event.addListener(map, "click", (e) => {
      const lat = e.coord.lat();
      const lon = e.coord.lng();

      // ✅ 마커가 이미 있다면 제거
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      // ✅ 새 마커 생성 및 지도에 추가
      const newMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lon),
        map: map,
        title: "선택된 위치",
      });

      markerRef.current = newMarker;

      // ✅ Reverse Geocoding
      naver.maps.Service.reverseGeocode({
        coords: new naver.maps.LatLng(lat, lon),
        orders: naver.maps.Service.OrderType.ADDR,
      }, (status, response) => {
        if (status !== naver.maps.Service.Status.OK) {
          console.error("지오코딩 실패");
          return;
        }

        const result = response.v2.results[0];
        const area1 = result.region.area1.name;
        const area2 = result.region.area2.name;
        const area3 = result.region.area3.name;

        const locationName = `${area1} ${area2} ${area3}`;

        if (onLocationClick) {
          onLocationClick({ lat, lon, locationName });
        }
      });
    });
  }, [onLocationClick]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="absolute top-0 left-0 w-full h-full" />
    </div>
  );
}

export default NaverMapView;
