import React from "react";
import Bar from "../components/Bar";
import Select from "../components/Select";
import Title from "../components/Title";
import LotWafer from "../components/LotWafer";
import Searchall from "../components/Searchall";

const searchallStyle = {
  marginLeft: "150px",
  marginBottom: "-50px",
};

const flexContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "50px",
};

export default function DataSearchPage() {
  return (
    <div>
      <Bar />
      <Title />
      <div style={flexContainerStyle}>
        <Select />
        <div style={searchallStyle}>
          <Searchall />
        </div>
      </div>
      <LotWafer />
    </div>
  );
}
