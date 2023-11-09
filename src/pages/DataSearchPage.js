import React, { useState } from "react";
import Bar from "../components/Bar";
import Select from "../components/Select";
import Title from "../components/Title";
import LotWafer from "../components/LotWafer";

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

  const [dateType, setDateType] = useState(""); // 데이터 타입
  const [startDate, setStartDate] = useState(""); // 달력 시작일
  const [endDate, setEndDate] = useState(""); // 달력 종료일

  const handleDateSelect = (type, start, end) => {
    setDateType(type);
    setStartDate(start);
    setEndDate(end);
    console.log(dateType, start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD"));
  };

  return (
    <div>
      <Bar />
      <Title />
      <div style={flexContainerStyle}>
        <Select onDateSelect={handleDateSelect} />
        {/* <div style={searchallStyle}>
          <Searchall onSearch={handleSearch} />
        </div> */}
      </div>
      <LotWafer
        searchQuery={searchQuery}
        searchOption={searchOption}
        dateType={dateType}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}
