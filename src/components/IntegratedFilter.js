import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const StyledSelect = styled("select")({
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "5px",
  marginRight: "10px",
  height: "35px",
});

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  flexDirection: "column",
  marginTop: "50px",
};

export default function IntegratedFilter({ onLineChange, onRecipeChange }) {
  const [selectedLine, setSelectedLine] = useState(""); // 선택된 라인 상태
  const [selectedRecipe, setSelectedRecipe] = useState(""); // 선택된 라인 상태

  const handleLineChange = (event) => {
    const line = event.target.value;
    setSelectedLine(line);
  };

  const handleRecipeChange = (event) => {
    const recipe = event.target.value;
    setSelectedRecipe(recipe);
  };

  const handleSearch = () => {
    onLineChange(selectedLine); // 검색 버튼 클릭 시 선택된 라인을 부모 컴포넌트로 전달
    onRecipeChange(selectedRecipe);
    console.log("Line, Recipe 선택", selectedLine, selectedRecipe);
  };

  return (
    <div style={containerStyle}>
      <div style={{ marginRight: "60px" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}> Line </span>
        <StyledSelect
          onChange={handleLineChange} // 라인 선택 변경 시 핸들러 호출
          style={{ width: "100px", marginLeft: "30px", marginBottom: "5px" }}
        >
          <option value="">Line 선택</option>
          <option value="KFR4">KFR4</option>
          <option value="KFR6">KFR6</option>
          <option value="PFBF">PFBF</option>
          <option value="KFBN">KFBN</option>
        </StyledSelect>
      </div>
      <div>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}> Recipe </span>
        <StyledSelect
          onChange={handleRecipeChange}
          style={{ width: "165px", marginLeft: "10px" }}
        >
          <option value="">Recipe 선택</option>
          <option value="TEST_RECIPE_001">TEST_RECIPE_001</option>
          <option value="TEST_RECIPE_002">TEST_RECIPE_002</option>
          <option value="TEST_RECIPE_003">TEST_RECIPE_003</option>
        </StyledSelect>
      </div>
      <Button
        variant="contained"
        onClick={handleSearch}
        style={{ marginTop: "10px" }}
      >
        검색
      </Button>
    </div>
  );
}
