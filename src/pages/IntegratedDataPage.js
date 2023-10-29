import React, { useState } from "react";
import Bar from "../components/Bar";
import Title from "../components/Title";
import Searchall from "../components/Searchall";
import IntegratedTable from "../components/IntegratedTable";

export default function IntegratedDataPage() {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [searchOption, setSearchOption] = useState("");

  const handleSearch = (query, option) => {
    setSearchQuery(query);
    setSearchOption(option);
  };

  return (
    <div>
      <Bar />
      <Title />
      <p>라인이랑 레시피 각각 dropdown으로 선택하게하자</p>
      <Searchall onSearch={handleSearch} />
      <IntegratedTable />
    </div>
  );
}
