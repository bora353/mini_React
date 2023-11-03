import React, { useState } from "react";
import Bar from "../components/Bar";
import Title from "../components/Title";
import LotWafer from "../components/LotWafer";
import { useLocation } from "react-router-dom";
import RmsData from "../components/RmsData";

export default function Rms() {
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

  const location = useLocation();
  const selectedData = location.state.selectedData;
  const [data, setData] = useState(selectedData);

  return (
    <div>
      <Bar />
      <Title />
      <div>
        <h3>선택한 데이터:</h3>
        <pre>{JSON.stringify(selectedData, null, 2)}</pre>
        <p>LotId: {data[0].LotId}</p>
        <p>LineId: {data[0].LineId}</p>
        <p>StepId: {data[0].StepId}</p>
        <p>DeviceId: {data[0].DeviceId}</p>
        <p>EquipId: {data[0].EquipId}</p>
        <p>RecipeId: {data[0].RecipeId}</p>
      </div>
      <RmsData />
      <LotWafer
        searchQuery={searchQuery}
        searchOption={searchOption}
        dateType={dateType}
        startDate={startDate}
        endDate={endDate}
        selectedLotID={data[0].LotId}
      />
    </div>
  );
}
