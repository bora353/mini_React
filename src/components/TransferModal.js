import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import FTP from "./FTP";

export default function TransferModal({ open, onClose, rowData }) {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          {/* <p>Lot ID: {rowData.LotId}</p>
          <p>Wafer No: {rowData.WaferNo}</p> */}
          <FTP
            LotId={rowData.LotId}
            WaferId={rowData.WaferNo}
            onClose={onClose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
