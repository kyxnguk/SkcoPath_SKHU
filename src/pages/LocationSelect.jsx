import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/locationSelect.css";

// LocationSelect 컴포넌트는 카카오맵 API를 사용하여 출발지를 선택하고 성공회대학교까지의 거리를 계산하는 기능을 제공합니다.
const LocationSelect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transport = location.state?.transport;

  // 상태 관리를 위한 useState 훅 사용
  const [map, setMap] = useState(null); // 카카오맵 인스턴스 저장
  const [markers, setMarkers] = useState([]); // 지도 위의 마커들을 관리
  const [distance, setDistance] = useState(null); // 계산된 거리 저장
  const [startAddress, setStartAddress] = useState(""); // 사용자가 입력한 주소 저장
  const [calculatedData, setCalculatedData] = useState(null); // CO2 계산 데이터 저장

  // 컴포넌트가 마운트될 때 카카오맵 초기화
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.4877, 126.8251), // 성공회대학교 좌표
      level: 3,
    };

    const newMap = new window.kakao.maps.Map(container, options);
    setMap(newMap);

    // 성공회대학교 마커 생성
    const skhuMarker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(37.4877, 126.8251),
      map: newMap,
    });

    setMarkers([skhuMarker]);
  }, []);

  // 주소 검색 및 거리 계산 처리 함수
  const handleAddressSubmit = (e) => {
    e.preventDefault();

    // 주소-좌표 변환 객체를 생성
    const geocoder = new window.kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색
    geocoder.addressSearch(startAddress, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        // 기존 출발지 마커가 있다면 제거
        if (markers.length > 1) {
          markers[1].setMap(null);
          markers.pop();
        }

        // 출발지 마커 생성
        const startMarker = new window.kakao.maps.Marker({
          position: coords,
          map: map,
        });

        setMarkers([...markers, startMarker]);

        // 지도 중심을 출발지로 이동
        map.setCenter(coords);

        // 거리 계산 - Haversine 공식 사용
        const skhuPosition = markers[0].getPosition();
        const R = 6371; // 지구의 반경 (km)
        const lat1 = (skhuPosition.getLat() * Math.PI) / 180;
        const lat2 = (coords.getLat() * Math.PI) / 180;
        const latDiff =
          ((coords.getLat() - skhuPosition.getLat()) * Math.PI) / 180;
        const lngDiff =
          ((coords.getLng() - skhuPosition.getLng()) * Math.PI) / 180;

        const a =
          Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
          Math.cos(lat1) *
            Math.cos(lat2) *
            Math.sin(lngDiff / 2) *
            Math.sin(lngDiff / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const dist = Math.round(R * c * 1000); // 미터 단위로 변환

        setDistance(dist);

        // CO2 계산 및 결과 페이지로 이동
        const monthlyDistance = (dist * 2 * 20) / 1000; // 월간 왕복 거리 (km)
        let co2 = 0;

        switch (transport) {
          case "휘발유":
            co2 = (monthlyDistance / 16.04) * 2.097;
            break;
          case "경유":
            co2 = (monthlyDistance / 15.35) * 2.582;
            break;
          case "LPG":
            co2 = (monthlyDistance / 11.06) * 1.868;
            break;
          default:
            co2 = 0;
        }

        setCalculatedData({
          distance: dist,
          transport: transport,
          co2: co2,
          monthlyDistance: monthlyDistance,
          startAddress: startAddress,
        });
      }
    });
  };

  const handleViewResult = () => {
    if (calculatedData) {
      navigate("/result", { state: calculatedData });
    }
  };

  // UI 렌더링
  return (
    <div className="location-select-container">
      <h2>출발지 선택</h2>
      <form onSubmit={handleAddressSubmit} className="address-form">
        <input
          type="text"
          value={startAddress}
          onChange={(e) => setStartAddress(e.target.value)}
          placeholder="출발지 주소를 입력하세요"
          className="address-input"
        />
        <button type="submit" className="address-submit-button">
          검색
        </button>
      </form>
      <div id="map" className="map-container"></div>
      {distance && (
        <div className="result-preview">
          <div className="distance-info">
            성공회대학교까지의 거리:{" "}
            {distance >= 1000
              ? `${(distance / 1000).toFixed(1)}km`
              : `${distance}m`}
          </div>
          <button className="result-button" onClick={handleViewResult}>
            결과 보러가기
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationSelect;
