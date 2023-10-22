import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "fileName", headerName: "File Name", width: 100 },
  {
    field: "filetime",
    headerName: "File time",
  },
  {
    field: "success",
    headerName: "Success",
  },
];

const rows = [
  {
    id: 1,
    fileName: "abc",
    filetime: "123",
    success: "성공",
  },
  {
    id: 2,
    fileName: "def",
    filetime: "456",
    success: "실패",
  },
];

export default function File() {
  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
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
