import React, { useState } from "react";
import axios from "axios";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const StyledSelect = styled("select")({
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "5px",
  marginRight: "10px",
  height: "35px",
  display: "block",
  margin: "0 auto",
  width: "120px",
});

const FileNameHeading = styled(Typography)({
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "10px",
});

const HorizontalContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  marginRight: "45px",
});

export default function TransferModal_integrated({
  open,
  onClose,
  rmsSelectedData,
  dmSelectedData,
}) {
  const [selectedOption, setSelectedOption] = useState("KFR4");
  const [checkOpen, setCheckOpen] = useState(false);

  const handleClickOpen = () => {
    setCheckOpen(true);
  };

  const handleClose = () => {
    setCheckOpen(false);
  };

  const handleTransfer = () => {
    // POST 요청 보낼 데이터
    const requestData = {
      rmsData: rmsSelectedData,
      dmData: dmSelectedData,
      selectedOption: selectedOption,
    };
    console.log("재확인: " + JSON.stringify(dmSelectedData));

    //POST 요청 보내기
    axios
      //.post("/api/csv/integrated", requestData)
      .post("/api/csv/integrated", JSON.stringify(requestData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("데이터 전송 성공", response);
        handleClose();

        if (onClose) {
          onClose();
        }
        toast.success("파일 전송이 완료되었습니다.", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
        });
      })
      .catch((error) => {
        console.error("데이터 전송 중 오류 발생ㅠㅠ:", error);
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <FileNameHeading
            style={{
              marginRight: "100px",
              marginLeft: "100px",
            }}
          >
            Data Summary
          </FileNameHeading>
          <div>
            <h4
              style={{ marginBottom: "5px", fontSize: "16px", color: "blue" }}
            >
              <AttachFileIcon sx={{ fontSize: "20px" }} />
              RMS 데이터:
            </h4>
            <div style={{ marginTop: "5px", marginLeft: "10px" }}>
              <span style={{ fontSize: "13px" }}>
                * RecipeId : {rmsSelectedData.recipeId} <br />* EquipId :{" "}
                {rmsSelectedData.equipId} <br />* IdwName :{" "}
                {rmsSelectedData.idwName} <br />* Version :{" "}
                {rmsSelectedData.version}
              </span>
            </div>

            {/* <pre>{JSON.stringify(rmsSelectedData, null, 2)}</pre> */}
          </div>
          <div>
            <h4
              style={{ marginBottom: "5px", fontSize: "16px", color: "blue" }}
            >
              <AttachFileIcon sx={{ fontSize: "20px" }} />
              Lot / Wafer 데이터
            </h4>
            <div style={{ marginTop: "5px", marginLeft: "10px" }}>
              <span style={{ fontSize: "13px" }}>
                * LotId : {dmSelectedData.LotId} <br />* WaferId :{" "}
                {dmSelectedData.WaferNo} <br />* LineId :{" "}
                {dmSelectedData.LineId}
                <br />* StepId : {dmSelectedData.StepId} <br />
              </span>
            </div>

            {/* <pre>{JSON.stringify(dmSelectedData, null, 2)}</pre> */}
          </div>

          <FileNameHeading
            style={{
              marginTop: "50px",
              marginRight: "100px",
              marginLeft: "100px",
            }}
          >
            Transfer To
          </FileNameHeading>
          <HorizontalContainer>
            <StyledSelect
              style={{ width: "120px", marginRight: "-5px" }}
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="default" selected disabled>
                ▶ Samsung
              </option>
              <option value="KFR4"> ▸ KFR4</option>
              <option value="PFBF"> ▸ PFBF</option>
            </StyledSelect>
            <Button variant="contained" onClick={handleClickOpen}>
              <DriveFileMoveIcon />
              파일 전송
            </Button>
          </HorizontalContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={checkOpen} onClose={handleClose}>
        <DialogContent>파일 전송하시겠습니까?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            취소
          </Button>
          <Button onClick={handleTransfer} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}
