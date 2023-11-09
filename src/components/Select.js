import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"; // DateTimePicker를 사용합니다.
//import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// const buttonStyle = {
//   marginLeft: "5px",
//   height: "55px",
//   marginTop: "10px",
// };

const containerStyle = {
  display: "flex",
  alignItems: "center",
  height: "55px",
};

const StyledSelect = styled("select")({
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "5px",
  width: "120px",

  height: "100%",
  marginTop: "10px",
  marginRight: "15px",
});

export default function Select({ onDateSelect }) {
  const today = dayjs();
  const startOfDay = today.set("hour", 0).set("minute", 0);
  const endOfDay = today.set("hour", 23).set("minute", 59);

  const [dateType, setDateType] = React.useState("saveDate"); // 데이터 타입
  const [startDate, setStartDate] = React.useState(startOfDay); // 시작일
  const [endDate, setEndDate] = React.useState(endOfDay); // 종료일

  const handleDateTypeChange = (event) => {
    setDateType(event.target.value);
    onDateSelect(dateType, startDate, endDate);
    console.log("데이터 타입:", event.target.value);
  };

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    onDateSelect(dateType, startDate, endDate);
    console.log("시작일:", newValue.format("YYYY-MM-DD"));
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    onDateSelect(dateType, startDate, endDate);
    console.log("종료일:", newValue.format("YYYY-MM-DD"));
  };

  React.useEffect(() => {
    onDateSelect(dateType, startDate, endDate);
  }, [dateType, startDate, endDate, onDateSelect]);

  return (
    <div style={{ marginTop: "30px" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={containerStyle}>
          <StyledSelect value={dateType} onChange={handleDateTypeChange}>
            <option value="saveDate">데이터 저장일</option>
            <option value="scanDate">설비 저장일</option>
          </StyledSelect>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DateTimePicker
              label="시작일"
              value={startDate}
              onChange={handleStartDateChange}
            />
            <DateTimePicker
              label="종료일"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </DemoContainer>
          {/* <Button
            onClick={handleSearchClick}
            variant="outlined"
            style={buttonStyle}
          >
            검색
          </Button> */}
        </div>
      </LocalizationProvider>
    </div>
  );
}
