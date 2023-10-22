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
      title = "통합데이터";
      break;
    case "/filecheck":
      title = "File Data";
      break;
    case "/summary":
      title = "Summary";
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
