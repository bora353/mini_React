import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export default function TransferModal_integrated({ open, onClose }) {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        {/* <DialogTitle>CSV 파일 전송</DialogTitle> */}
        <DialogContent>정보 보내기</DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
