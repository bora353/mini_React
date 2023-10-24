import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "DefectNo", headerName: "DefectNo", width: 100 },
  { field: "DefectId", headerName: "DefectId", width: 100 },
  { field: "XRel", headerName: "XRel" },
  { field: "YRel", headerName: "YRel" },
  { field: "XIndex", headerName: "XIndex" },
  { field: "YIndex", headerName: "YIndex" },
  { field: "RoughBinNumber", headerName: "RoughBinNumber", width: 200 },
  { field: "FineBinNumber", headerName: "FineBinNumber", width: 200 },
];

// const rows = [
//   {
//     id: 1,
//     WaferNo: "01",
//     DefectID: "123",
//   },
//   {
//     id: 2,
//     WaferNo: "def",
//     DefectID: "456",
//   },
// ];

export default function Defect({ selectedSlotNo }) {
  const [defectData, setDefectData] = useState([]);

  useEffect(() => {
    axios
      .get("/parsing")
      .then((response) => {
        console.log(response.data.Defects);
        setDefectData(response.data.Defects);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      });
  }, []);

  const filteredRows = selectedSlotNo
    ? defectData.filter((row) => row.SlotNo === selectedSlotNo)
    : [];

  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        <h3 style={{ margin: "10px 200px" }}>Defect</h3>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            disableSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            getRowId={(row) => row.DefectNo}
            sx={{ margin: "0 200px" }}
          />
        </div>
      </div>
    </div>
  );
}
