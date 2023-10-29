import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const cellStyle = {
  borderBottom: "1px solid rgba(224, 224, 224, 1)",
  borderLeft: "2px solid rgba(224, 224, 224, 1)",
  borderRight: "2px solid rgba(224, 224, 224, 1)",
};

const headerCellStyle = {
  borderLeft: "2px solid rgba(224, 224, 224, 1)",
  borderBottom: "2px solid rgba(224, 224, 224, 1)",
  borderRight: "2px solid rgba(224, 224, 224, 1)",
  borderTop: "2px solid rgba(224, 224, 224, 1)",
};

const tableContainerStyle = {
  margin: "100px 50px 0 50px",
};

export default function IntegratedTable() {
  return (
    <div style={tableContainerStyle}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} style={headerCellStyle} align="center">
                DM
              </TableCell>
              <TableCell colSpan={4} style={headerCellStyle} align="center">
                RMS
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={cellStyle}>LotID</TableCell>
              <TableCell style={cellStyle}>LineId</TableCell>
              <TableCell style={cellStyle}>DeviceId</TableCell>
              <TableCell style={cellStyle}>StepId</TableCell>
              <TableCell style={cellStyle}>EquipId</TableCell>
              <TableCell style={cellStyle}>RecipeId</TableCell>
              <TableCell style={cellStyle}>LineId</TableCell>
              <TableCell style={cellStyle}>StepId</TableCell>
              <TableCell style={cellStyle}>EquipId</TableCell>
              <TableCell style={cellStyle}>RecipeId</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={cellStyle}>T56789</TableCell>
              <TableCell style={cellStyle}>abc</TableCell>
              <TableCell style={cellStyle}>Device123</TableCell>
              <TableCell style={cellStyle}>Step456</TableCell>
              <TableCell style={cellStyle}>Equip789</TableCell>
              <TableCell style={cellStyle}>RecipeXYZ</TableCell>
              <TableCell style={cellStyle}>def</TableCell>
              <TableCell style={cellStyle}>Step789</TableCell>
              <TableCell style={cellStyle}>EquipABC</TableCell>
              <TableCell style={cellStyle}>Recipe123</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={cellStyle}>T56789</TableCell>
              <TableCell style={cellStyle}>abc</TableCell>
              <TableCell style={cellStyle}>Device123</TableCell>
              <TableCell style={cellStyle}>Step456</TableCell>
              <TableCell style={cellStyle}>Equip789</TableCell>
              <TableCell style={cellStyle}>RecipeXYZ</TableCell>
              <TableCell style={cellStyle}>def</TableCell>
              <TableCell style={cellStyle}>Step789</TableCell>
              <TableCell style={cellStyle}>EquipABC</TableCell>
              <TableCell style={cellStyle}>Recipe123</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={cellStyle}>T56789</TableCell>
              <TableCell style={cellStyle}>abc</TableCell>
              <TableCell style={cellStyle}>Device123</TableCell>
              <TableCell style={cellStyle}>Step456</TableCell>
              <TableCell style={cellStyle}>Equip789</TableCell>
              <TableCell style={cellStyle}>RecipeXYZ</TableCell>
              <TableCell style={cellStyle}>def</TableCell>
              <TableCell style={cellStyle}>Step789</TableCell>
              <TableCell style={cellStyle}>EquipABC</TableCell>
              <TableCell style={cellStyle}>Recipe123</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
