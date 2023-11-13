import React from "react";
import Bar from "../components/Bar";
import Title from "../components/Title";
import File from "../components/File";

const flexContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "50px",
};

export default function FileCheckPage() {
  return (
    <div>
      <Bar />
      <Title />
      <div style={flexContainerStyle}></div>
      <File />
    </div>
  );
}
