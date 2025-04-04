import React, { useEffect, useRef } from "react";

function NaverMapView({ onLocationClick, reset }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // ✅ 최초 지도 초기화
  useEffect(() => {
    const { naver } = window;

    if (!mapRef.current) {
      const center = new naver.maps.LatLng(37.5665, 126.9780);
      const map = new naver.maps.Map(containerRef.current, {
        center,
        zoom: 7,
        minZoom: 6,
        maxZoom: 14,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.RIGHT_BOTTOM,
        },
        scrollWheel: true,
        disableDoubleClickZoom: false,
      });

      mapRef.current = map;

      naver.maps.Event.addListener(map, "click", (e) => {
        const lat = e.coord.lat();
        const lon = e.coord.lng();
        const clickedLatLng = new naver.maps.LatLng(lat, lon);

        map.panTo(clickedLatLng);

        if (!markerRef.current) {
          markerRef.current = new naver.maps.Marker({
            position: clickedLatLng,
            map: map,
            animation: naver.maps.Animation.DROP,
          });
        } else {
          markerRef.current.setPosition(clickedLatLng);
        }

        naver.maps.Service.reverseGeocode({
          coords: clickedLatLng,
          orders: naver.maps.Service.OrderType.ADDR,
        }, (status, response) => {
          if (status !== naver.maps.Service.Status.OK) return;

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
    }
  }, [onLocationClick]);

  // ✅ reset 발생 시 지도 초기화
  useEffect(() => {
    if (reset && mapRef.current) {
      const center = new window.naver.maps.LatLng(37.5665, 126.9780);
      mapRef.current.setCenter(center);
      mapRef.current.setZoom(7);

      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
    }
  }, [reset]);

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="absolute top-0 left-0 w-full h-full" />
    </div>
  );
}

export default NaverMapView;
