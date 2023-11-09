import React from "react";
import { Background, LoadingText } from "./Style";
import Spinner from "../assets/spinner.gif";
import "./Loading.css";

export default function Loading({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <Background>
          <LoadingText>Loading...</LoadingText>
          <img src={Spinner} alt="로딩중" />
        </Background>
      </div>
    </div>
  );
}
