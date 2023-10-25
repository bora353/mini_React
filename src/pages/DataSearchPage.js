import React, { useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [searchOption, setSearchOption] = useState("LotID"); // 검색 옵션

  const handleSearch = (query, option) => {
    setSearchQuery(query);
    setSearchOption(option);
  };

  return (
    <div>
      <Bar />
      <Title />
      <div style={flexContainerStyle}>
        <Select />
        <div style={searchallStyle}>
          <Searchall onSearch={handleSearch} />
        </div>
      </div>
      <LotWafer searchQuery={searchQuery} searchOption={searchOption} />
    </div>
  );
}
