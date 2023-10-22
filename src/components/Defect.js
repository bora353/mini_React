import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "WaferID", headerName: "WaferID", width: 100 },
  {
    field: "DefectID",
    headerName: "DefectID",
  },
];

const rows = [
  {
    id: 1,
    WaferID: "abc",
    DefectID: "123",
  },
  {
    id: 2,
    WaferID: "def",
    DefectID: "456",
  },
];

export default function Defect({ selectedWaferID }) {
  const filteredRows = selectedWaferID
    ? rows.filter((row) => row.WaferID === selectedWaferID)
    : [];

  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        <h3>Defect</h3>
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
          />
        </div>
      </div>
    </div>
  );
}
