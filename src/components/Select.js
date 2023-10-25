import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";

const buttonStyle = {
  marginLeft: "5px", // 원하는 마진 값으로 설정
};

const containerStyle = {
  display: "flex", // Flexbox 사용
  alignItems: "center", // 수직 가운데 정렬
};

export default function Select() {
  // const [value, setValue] = React.useState(dayjs());
  const [startDate, setStartDate] = React.useState(dayjs());
  const [endDate, setEndDate] = React.useState(dayjs());

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    console.log("시작일:", newValue.format("YYYY-MM-DD"));
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    console.log("종료일:", newValue.format("YYYY-MM-DD"));
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={containerStyle}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="시작일"
              value={startDate}
              onChange={handleStartDateChange}
            />
            <DatePicker
              label="종료일"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </DemoContainer>
          <Button variant="outlined" style={buttonStyle}>
            검색
          </Button>
        </div>
      </LocalizationProvider>
    </div>
  );
}
