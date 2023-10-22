import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Searchall from "./Searchall";

const flexContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "50px",
};

const searchallStyle = {
  marginLeft: "100px",
};

export default function Select() {
  const [value, setValue] = React.useState(dayjs());
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
      <div style={flexContainerStyle}>
        {/* calandar ================================================ */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        </LocalizationProvider>

        {/* search ======================================================= */}
        <div style={searchallStyle}>
          <Searchall />
        </div>
      </div>
    </div>
  );
}
