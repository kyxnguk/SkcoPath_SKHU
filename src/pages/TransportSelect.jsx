import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/transportSelect.css";

const TransportSelect = () => {
  const navigate = useNavigate();
  const [selectedTransport, setSelectedTransport] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleTransportSelect = (transport) => {
    setSelectedTransport(transport);
    setIsOpen(false);
  };

  const handleNext = () => {
    if (!selectedTransport) return;

    // 선택한 교통수단 정보를 가지고 location 페이지로 이동
    navigate("/location", {
      state: { transport: selectedTransport },
    });
  };

  return (
    <div className="transport-select-container">
      <h2>교통수단 선택</h2>
      <p className="subtitle">학교까지 타고온 교통수단을 선택해주세요!</p>

      <div className="dropdown-container">
        <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
          {selectedTransport || "교통수단 선택하기"}
          <span className="arrow">{isOpen ? "▲" : "▼"}</span>
        </button>

        {isOpen && (
          <div className="dropdown-content">
            <button onClick={() => handleTransportSelect("휘발유")}>
              휘발유 차량
            </button>
            <button onClick={() => handleTransportSelect("경유")}>
              경유 차량
            </button>
            <button onClick={() => handleTransportSelect("LPG")}>
              LPG 차량
            </button>
            <button onClick={() => handleTransportSelect("승용차 없음")}>
              승용차 없음
            </button>
          </div>
        )}
      </div>

      {selectedTransport && (
        <button className="next-button" onClick={handleNext}>
          다음
        </button>
      )}
    </div>
  );
};

export default TransportSelect;
