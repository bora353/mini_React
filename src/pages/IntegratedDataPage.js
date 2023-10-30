import React, { useState } from "react";
import Bar from "../components/Bar";
import Title from "../components/Title";
import IntegratedTable from "../components/IntegratedTable";
import IntegratedFilter from "../components/IntegratedFilter";

export default function IntegratedDataPage() {
  // const [searchQuery, setSearchQuery] = useState(""); // 검색어
  // const [searchOption, setSearchOption] = useState("");

  // const handleSearch = (query, option) => {
  //   setSearchQuery(query);
  //   setSearchOption(option);
  // };

  const [selectedLine, setSelectedLine] = useState(""); // 선택된 라인 저장
  const [selectedRecipe, setSelectedRecipe] = useState(""); // 선택된 레시피 저장
  const [integratedData, setIntegratedData] = useState([]); // 전체 데이터를 저장

  // 라인 저장
  const handleLineChange = (line) => {
    setSelectedLine(line);
  };

  // 레시피 저장
  const handleRecipeChange = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div>
      <Bar />
      <Title />
      <IntegratedFilter
        onLineChange={handleLineChange}
        onRecipeChange={handleRecipeChange}
      />
      {/* <Searchall onSearch={handleSearch} /> */}
      <IntegratedTable
        selectedLine={selectedLine}
        selectedRecipe={selectedRecipe}
        integratedData={integratedData}
        setIntegratedData={setIntegratedData}
      />
    </div>
  );
}
