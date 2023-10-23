import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "WaferNo", headerName: "WaferNo", width: 100 },
  {
    field: "DefectID",
    headerName: "DefectID",
  },
];

const rows = [
  {
    id: 1,
    WaferNo: "01",
    DefectID: "123",
  },
  {
    id: 2,
    WaferNo: "def",
    DefectID: "456",
  },
];

export default function Defect({ selectedWaferNo }) {
  const filteredRows = selectedWaferNo
    ? rows.filter((row) => row.WaferNo === selectedWaferNo)
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
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            sx={{ margin: "0 200px" }}
          />
        </div>
      </div>
    </div>
  );
}
