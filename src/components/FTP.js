import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import { format } from "date-fns";

const StyledSelect = styled("select")({
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "5px",
  marginRight: "10px",
  height: "35px",
});

const CenteredContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
});

const HorizontalContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const FileNameHeading = styled(Typography)({
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "10px",
});

export default function FTP({ LotId, WaferId, onClose }) {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedOption, setSelectedOption] = useState("ABC");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };

  const currentDateTime = getCurrentDateTime();

  useEffect(() => {
    const getCurrentDateTime = () => {
      const now = new Date();
      return format(now, "yyyyMMdd_HH:mm:ss");
    };

    const currentDateTime = getCurrentDateTime();
    const initialFileName = `${LotId}_${WaferId}_${currentDateTime}`;
    const sanitizedFileName = initialFileName.replace(/:/g, "");
    setFileName(sanitizedFileName);
  }, [LotId, WaferId]); // LotId 또는 WaferId가 변경될 때만 업데이트

  const handleFileUpload = () => {
    const data = {
      fileName: fileName,
      selectedOption: selectedOption, // 선택한 옵션을 추가
    };

    axios
      .post("/api/csv", data) // POST 요청으로 변경
      .then((response) => {
        console.log("파일명 및 선택한 옵션 전달 성공", response);
        handleClose();

        if (onClose) {
          onClose();
        }
      })
      .catch((error) => {
        console.error("파일명 및 선택한 옵션 전달 실패", error);
      });
  };

  return (
    <div>
      <CenteredContainer>
        <HorizontalContainer>
          <AttachFileIcon />
          <FileNameHeading>FileName</FileNameHeading>
        </HorizontalContainer>
        <Typography
          variant="body1"
          component="div"
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            width: "350px",
            borderRadius: "5px",
          }}
        >
          {fileName}.csv
        </Typography>

        <FileNameHeading style={{ marginTop: "50px" }}>
          Transfer To
        </FileNameHeading>
        <HorizontalContainer>
          <StyledSelect
            style={{ width: "120px" }}
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="ABC">ABC폴더</option>
            <option value="DEF">DEF폴더</option>
          </StyledSelect>
          <Button variant="contained" onClick={handleClickOpen}>
            <DriveFileMoveIcon />
            파일 전송
          </Button>
        </HorizontalContainer>
      </CenteredContainer>

      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>파일 전송</DialogTitle> */}
        <DialogContent>파일 전송하시겠습니까?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            취소
          </Button>
          <Button onClick={handleFileUpload} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
