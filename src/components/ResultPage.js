import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResultPage.css";
import { personalityData } from "../data/personalityData";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { personalityType, scores } = location.state || { personalityType: "Unknown", scores: {} };

  const traits = [
    { left: "L", right: "U", label: "리더십 / 유연성" },
    { left: "C", right: "I", label: "소통 / 독립성" },
    { left: "T", right: "A", label: "논리 / 창의" },
    { left: "E", right: "P", label: "실행 / 계획" }
  ];

  const personalityDesc = personalityData[personalityType]?.desc || "<p>해당 유형에 대한 설명이 없습니다.</p>";
  const bestMatches = personalityData[personalityType]?.best || [];
  const avoidMatches = personalityData[personalityType]?.avoid || [];

  return (
    <div className="result-container">
      <h1 className="result-title">✨ 당신의 성향 결과 ✨</h1>

      <div className="personality-box">
        <h2 className="personality-type">{personalityType} 유형</h2>
        <div
          className="personality-description"
          dangerouslySetInnerHTML={{ __html: personalityDesc.replace(/<\/p>/g, "</p><br>") }}
        />
      </div>

      <div className="chart-container">
        {traits.map(({ left, right }, index) => {
          const leftScore = scores[left] || 0;
          const rightScore = scores[right] || 0;
          const total = leftScore + rightScore || 1;
          const leftPercent = ((leftScore / total) * 100).toFixed(1);
          const rightPercent = ((rightScore / total) * 100).toFixed(1);

          return (
            <div className="trait-row" key={index}>
              <div className="trait-label left-label">{left}</div>
              <div className="progress-bar">
                <div className="progress-segment left" style={{ width: `${leftPercent}%` }}>
                  {leftPercent}%
                </div>
                <div className="progress-segment right" style={{ width: `${rightPercent}%` }}>
                  {rightPercent}%
                </div>
              </div>
              <div className="trait-label right-label">{right}</div>
            </div>
          );
        })}
      </div>

      {/* 잘 맞는 유형 & 맞지 않는 유형 표시 */}
      <div className="match-container">
        <h3 className="match-title">잘 맞는 유형</h3>
        <div className="match-tags best">
          {bestMatches.map((type) => (
            <span key={type} className="match-tag best-tag">{type}</span>
          ))}
        </div>

        <h3 className="match-title">잘 맞지 않는 유형</h3>
        <div className="match-tags avoid">
          {avoidMatches.map((type) => (
            <span key={type} className="match-tag avoid-tag">{type}</span>
          ))}
        </div>
      </div>

      <div className="button-container">
        <button className="restart-button" onClick={() => navigate("/")}>다시 하기</button>
      </div>
    </div>
  );
}

export default ResultPage;
