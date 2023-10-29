import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const MainTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
`;

export default function Title() {
  const location = useLocation();

  let title;
  switch (location.pathname) {
    case "/integrateddata":
      title = "통합시스템";
      break;
    case "/filecheck":
      title = "File Data";
      break;
    case "/summary":
      title = "csv 파일 전송";
      break;
    default:
      title = "데이터 조회";
  }

  return (
    <div className="App" style={{ marginTop: "50px" }}>
      <MainTitle>{title}</MainTitle>
    </div>
  );
}
