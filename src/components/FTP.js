import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import Typography from "@mui/material/Typography";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

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
  marginTop: "70px",
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

export default function FTP() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <CenteredContainer>
        <HorizontalContainer style={{ marginTop: "30px" }}>
          <AttachFileIcon />
          <FileNameHeading>FileName</FileNameHeading>
        </HorizontalContainer>
        <Typography
          variant="body1"
          component="div"
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            width: "500px",
            borderRadius: "5px",
          }}
        >
          LotId_WaferId_시간으로 파일명.csv
        </Typography>

        <FileNameHeading style={{ marginTop: "100px" }}>
          FTP 전송 폴더 선택
        </FileNameHeading>
        <HorizontalContainer>
          <StyledSelect
            //value={selectedOption}
            //onChange={handleOptionChange}
            style={{ width: "120px" }}
          >
            <option value="A">A폴더</option>
            <option value="B">B폴더</option>
          </StyledSelect>
          <Button variant="contained" onClick={handleClickOpen}>
            <DriveFileMoveIcon />
            파일 전송
          </Button>
        </HorizontalContainer>
      </CenteredContainer>

      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>파일 전송</DialogTitle> */}
        <DialogContent>파일 전송이 완료되었습니다.</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
