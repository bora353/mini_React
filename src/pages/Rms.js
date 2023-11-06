import React, { useState } from "react";
import Bar from "../components/Bar";
import Title from "../components/Title";
import { useLocation } from "react-router-dom";
import RmsData from "../components/RmsData";
import LotWafer_integrated from "../components/LotWafer_integrated";
import { Button } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import TransferModal from "../components/TransferModal";
import TransferModal_integrated from "../components/TransferModal_integrated";

export default function Rms() {
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

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 변수
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Bar />
      <Title />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <Button variant="contained" onClick={openModal}>
          CSV <SaveAltIcon fontSize="small" style={{ cursor: "pointer" }} />
        </Button>
      </div>

      {isModalOpen && (
        <TransferModal_integrated open={isModalOpen} onClose={closeModal} />
      )}
      {/* <div>
        <pre>{JSON.stringify(selectedData, null, 2)}</pre>
        <p>LotId: {data[0].LotId}</p>
        <p>LineId: {data[0].LineId}</p>
        <p>StepId: {data[0].StepId}</p>
        <p>DeviceId: {data[0].DeviceId}</p>
        <p>EquipId: {data[0].EquipId}</p>
        <p>RecipeId: {data[0].RecipeId}</p>
      </div> */}
      <RmsData IntegratedRecipeId={data[0].RecipeId} />
      <LotWafer_integrated
        dateType={dateType}
        startDate={startDate}
        endDate={endDate}
        selectedLotID={data[0].LotId}
      />
    </div>
  );
}
