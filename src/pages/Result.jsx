import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/result.css";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { distance, transport, co2, monthlyDistance, startAddress } =
    location.state || {};

  // 교통수단별 기준 배출량 (kg/월)
  const standardEmissions = {
    휘발유: 115.2,
    경유: 102.6,
    LPG: 90.0,
  };

  // 현재 교통수단의 기준 배출량
  const standardEmission = standardEmissions[transport] || 115.2;

  // 배출량 상태 판단
  const getEmissionStatus = () => {
    if (co2 <= standardEmission * 0.7) return "excellent";
    if (co2 <= standardEmission) return "good";
    return "warning";
  };

  // 배출량 상태 텍스트 반환
  const getEmissionStatusText = () => {
    const status = getEmissionStatus();
    switch (status) {
      case "excellent":
        return "매우 좋음";
      case "good":
        return "좋음";
      default:
        return "개선 필요";
    }
  };

  // 배출량 수준별 맞춤 실천 방안
  const getSuggestions = () => {
    const status = getEmissionStatus();

    const suggestions = {
      excellent: [
        {
          title: "현재 수준 유지하기",
          description:
            "현재의 친환경적인 이동 습관을 잘 유지하고 있습니다. 주변 사람들에게도 이런 습관을 공유해보세요.",
        },
        {
          title: "추가 개선 방안",
          description:
            "카풀이나 자전거 이용을 더 늘려 탄소 발자국을 더욱 줄여보세요.",
        },
      ],
      good: [
        {
          title: "대중교통 이용 늘리기",
          description:
            "월 1-2회 더 대중교통을 이용하면 탄소 배출을 크게 줄일 수 있습니다.",
        },
        {
          title: "경제 운전 실천",
          description:
            "급출발, 급제동을 피하고 경제속도를 유지하면 연비가 10-20% 개선됩니다.",
        },
        {
          title: "차량 점검",
          description:
            "정기적인 타이어 공기압 체크와 엔진 점검으로 연비를 개선하세요.",
        },
      ],
      warning: [
        {
          title: "대중교통 전환",
          description: `현재 배출량(${co2.toFixed(
            1
          )}kg)이 기준(${standardEmission}kg)을 초과했습니다. 버스(105g CO₂/km)나 지하철(41g CO₂/km) 이용을 권장합니다.`,
        },
        {
          title: "친환경 차량 고려",
          description:
            "향후 차량 교체 시 하이브리드나 전기차 등 저탄소 차량 도입을 고려해보세요.",
        },
        {
          title: "이동 거리 최적화",
          description:
            "카풀, 재택근무, 이동경로 최적화 등으로 총 이동거리를 줄여보세요.",
        },
        {
          title: "에코 드라이빙",
          description:
            "공회전 줄이기, 경제속도 유지, 적정 공기압 관리로 연비를 개선하세요.",
        },
      ],
    };

    return suggestions[status] || suggestions.warning;
  };

  return (
    <div className="result-container">
      <h2>탄소 배출량 계산 결과</h2>

      <div className="result-card">
        <div className="result-item">
          <h3>출발지</h3>
          <p>{startAddress}</p>
        </div>

        <div className="result-item">
          <h3>이동 거리</h3>
          <p>{(distance / 1000).toFixed(2)} km (편도)</p>
          <p className="monthly-distance">
            {monthlyDistance.toFixed(2)} km/월 (왕복)
          </p>
        </div>

        <div className="result-item">
          <h3>선택한 교통수단</h3>
          <p>{transport} 차량</p>
        </div>

        <div className="result-item">
          <h3>월간 CO₂ 발생량</h3>
          <div className="emission-status">
            <p className={`emission-value ${getEmissionStatus()}`}>
              {co2.toFixed(2)} kg/월
            </p>
            <span className={`status-badge ${getEmissionStatus()}`}>
              {getEmissionStatusText()}
            </span>
          </div>
          <p className="standard-emission">
            기준 배출량: {standardEmission} kg/월
          </p>
        </div>

        <div className="result-item suggestions-section">
          <h3>탄소 배출 감소를 위한 실천 방안</h3>
          <div className="suggestions-grid">
            {getSuggestions().map((suggestion, index) => (
              <div key={index} className="suggestion-card">
                <h4>{suggestion.title}</h4>
                <p>{suggestion.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="button-group">
          <button className="action-button home" onClick={() => navigate("/")}>
            메인페이지로 <br /> 돌아가기
          </button>
          <button
            className="action-button retry"
            onClick={() => navigate("/transport")}
          >
            다시 알아보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
