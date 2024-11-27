import React from "react";
import "../style/home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/transport");
  };

  return (
    <div className="home-container">
      <section className="intro-section">
        <div className="intro-content">
          <h1>SKCO Path</h1>
          <p className="main-text">
            지구를 위한 첫 걸음,
            <br />
            SKCO Path에서 시작하세요
          </p>
        </div>
      </section>

      <section className="why-section">
        <h2>Why SKCO Path?</h2>
        <div className="content-box">
          <p>
            과학기술과 에콜로지 수업에서 탄소 배출량에 대해 배우며, 한국이 1인당
            배출량 기준으로 세계 상위권에 속해 있다는 점을 알게 되었습니다.
            <br />
            <br />
            많은 탄소 배출량 분야 중 저희는 교통 분야에서 탄소 배출을 줄이는
            쪽으로 생각을 해보았습니다. 이러한 노력을 함께 실천할 수 있도록 이
            프로젝트를 준비하게 되었습니다.
          </p>
        </div>
      </section>

      <section className="how-section green">
        <div className="section-header">
          <h2>How?</h2>
          <p className="section-subtitle">어떻게 실천할 수 있을까요?</p>
        </div>
        <div className="tips-container">
          <div className="tip-card">
            <div className="tip-header">
              <span className="tip-number">01</span>
              <h3>도보와 자전거로 더 많이 이동하기</h3>
            </div>
            <p>
              가까운 거리는 걷거나 자전거를 이용해 건강과 환경을 동시에
              지키세요.
            </p>
          </div>
          <div className="tip-card">
            <div className="tip-header">
              <span className="tip-number">02</span>
              <h3>대중교통 더 자주 이용하기</h3>
            </div>
            <p>
              주 1~2회 차량 대신 버스나 지하철을 이용해 탄소 배출을 줄여보세요.
            </p>
          </div>
          <div className="tip-card">
            <div className="tip-header">
              <span className="tip-number">03</span>
              <h3>에너지 효율적인 운전 습관</h3>
            </div>
            <p>경제속도(60~80km)를 유지하고 급가속과 급정지를 피하세요.</p>
          </div>
          <div className="tip-card">
            <div className="tip-header">
              <span className="tip-number">04</span>
              <h3>불필요한 짐은 트렁크에서 비우기</h3>
            </div>
            <p>차량 무게를 줄이면 연료 소비도 줄어듭니다.</p>
          </div>
          <div className="tip-card">
            <div className="tip-header">
              <span className="tip-number">05</span>
              <h3>타이어 공기압 정기 점검</h3>
            </div>
            <p>
              적정 공기압을 유지하면 연비 효율이 개선되고 배출량도 감소합니다.
            </p>
          </div>
          <div className="tip-card">
            <div className="tip-header">
              <span className="tip-number">06</span>
              <h3>실시간 네비게이션 활용</h3>
            </div>
            <p>최적의 경로로 이동해 불필요한 연료 낭비를 방지하세요.</p>
          </div>
          <div className="tip-card">
            <div className="tip-header">
              <span className="tip-number">07</span>
              <h3>친환경 자동차 사용하기</h3>
            </div>
            <p>전기차, 하이브리드 차량 등 저탄소 차량으로 전환을 고려하세요.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>나의 탄소 배출량은 얼마일까요?</h2>
          <p>지금 바로 확인해보세요!</p>
          <button className="start-button" onClick={handleStartClick}>
            탄소 배출량 계산하기
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
