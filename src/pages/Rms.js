import React, { useState, useEffect } from "react";
import Bar from "../components/Bar";
import Title from "../components/Title";
import { useLocation } from "react-router-dom";
import LotWafer_integrated from "../components/LotWafer_integrated";
import { Button } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import TransferModal_integrated from "../components/TransferModal_integrated";
import RmsData_integrated from "../components/RmsData_integrated";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Rms() {
  const [dateType, setDateType] = useState(""); // 데이터 타입
  const [startDate, setStartDate] = useState(""); // 달력 시작일
  const [endDate, setEndDate] = useState(""); // 달력 종료일
  const [rmsSelectedData, setRmsSelectedData] = useState([]); // 선택한 데이터
  const [dmSelectedData, setDmSelectedData] = useState([]); // 선택한 데이터

  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // LotId와 RecipeId를 가져옵니다.
    const lotId = searchParams.get("LotId");
    const recipeId = searchParams.get("RecipeId");

    // 가져온 데이터를 state에 저장합니다.
    setData({
      LotId: lotId,
      RecipeId: recipeId,
    });

    console.log("check!!", lotId, recipeId);
  }, [location.search]);
  //----------

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 변수

  const openModal = () => {
    if (rmsSelectedData.length === 0 || dmSelectedData.length === 0) {
      toast.error("데이터가 선택되지 않았습니다.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
      });
    } else {
      setIsModalOpen(true);
    }
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
        <TransferModal_integrated
          open={isModalOpen}
          onClose={closeModal}
          rmsSelectedData={rmsSelectedData}
          dmSelectedData={dmSelectedData}
        />
      )}
      {/* <div>
        <pre>{JSON.stringify(selectedData, null, 2)}</pre>
        <p>LotId: {data[0].LotId}</p>
        <p>RecipeId: {data[0].RecipeId}</p>
      </div> */}

      <RmsData_integrated
        IntegratedRecipeId={data.RecipeId}
        setRmsSelectedData={setRmsSelectedData}
      />
      {/* <RmsData IntegratedRecipeId={data[0].RecipeId} /> */}
      <LotWafer_integrated
        dateType={dateType}
        startDate={startDate}
        endDate={endDate}
        selectedLotID={data.LotId}
        setDmSelectedData={setDmSelectedData}
      />
      <ToastContainer />
    </div>
  );
}
