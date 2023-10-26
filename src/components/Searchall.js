import React from "react";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#5F85BB", 0.3), // 여기에서 색상과 투명도 조절
  "&:hover": {
    backgroundColor: alpha("#5F85BB", 0.6), // hover 시 색상 및 투명도 조절
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: "none",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
    },
    height: "100%",
  },
}));

const buttonStyle = {
  marginLeft: "5px",
  height: "35px",
};

const StyledSelect = styled("select")({
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "5px",
  marginRight: "10px",
  height: "35px",
  //marginTop: "10px",
});

export default function Searchall({ onSearch }) {
  const [searchValue, setSearchValue] = React.useState(""); // 검색어
  const [selectedOption, setSelectedOption] = React.useState("LotID"); // 옵션

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);

    // 옵션 변경 시 검색어를 비움
    setSearchValue("");
  };

  const handleSearch = () => {
    // 검색 버튼 클릭 시 실행되는 로직
    console.log("선택한 옵션:", selectedOption);
    console.log("검색어:", searchValue);

    // 검색 로직을 수행
    onSearch(searchValue, selectedOption);
  };

  return (
    <div>
      <Toolbar>
        <StyledSelect
          value={selectedOption}
          onChange={handleOptionChange}
          autoWidth
        >
          <option value="LotID">LotID</option>
          <option value="WaferID">WaferID</option>
        </StyledSelect>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="입력하시오"
            inputProps={{ "aria-label": "search" }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                // 엔터 키가 눌렸을 때 검색 실행
                handleSearch();
              }
            }}
          />
        </Search>
        <Button variant="outlined" style={buttonStyle} onClick={handleSearch}>
          검색
        </Button>
      </Toolbar>
    </div>
  );
}
