import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import "../styles/QuestionPage.css";

function QuestionPage() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSelect = (index, value) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const calculatePersonalityType = () => {
    const typeCounts = { L: 0, U: 0, C: 0, I: 0, T: 0, A: 0, E: 0, P: 0 };

    // 모든 질문에 대한 응답 확인
    if (Object.keys(selectedAnswers).length !== questions.length) {
      setError("❗ 모든 항목을 선택해야 합니다.");
      return null;
    }

    questions.forEach((q, idx) => {
      if (selectedAnswers[idx]) {
        typeCounts[q.category] += selectedAnswers[idx];
      }
    });

    const first = typeCounts["L"] >= typeCounts["U"] ? "L" : "U";
    const second = typeCounts["C"] >= typeCounts["I"] ? "C" : "I";
    const third = typeCounts["T"] >= typeCounts["A"] ? "T" : "A";
    const fourth = typeCounts["E"] >= typeCounts["P"] ? "E" : "P";
    const personalityType = `${first}${second}${third}${fourth}`;

    return { personalityType, scores: typeCounts };
  };

  return (
    <div className="container">
      <h1 className="title">협업 성향 테스트</h1>
      {questions.map((q, idx) => (
        <div key={idx} className="question-container">
          <p className="question-text">{q.text}</p>
          <br/>
          <div className="options">
            {[1, 2, 3, 4, 5].map(value => (
              <button 
                key={value}
                className={`option-button ${selectedAnswers[idx] === value ? "selected" : ""}`}
                onClick={() => handleSelect(idx, value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}

      {error && <p className="error-message">{error}</p>}

      <div className="button-container">
        <button className="random-button" onClick={() => {
          const randomAnswers = {};
          questions.forEach((_, idx) => {
            randomAnswers[idx] = Math.floor(Math.random() * 5) + 1;
          });
          setSelectedAnswers(randomAnswers);
          setError("");
        }}>
          랜덤 점수 부여
        </button>

        <button className="next-button" onClick={() => {
          const result = calculatePersonalityType();
          if (result) navigate("/result", { state: result });
        }}>
          결과 보기
        </button>
      </div>
    </div>
  );
}

export default QuestionPage;
