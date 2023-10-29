import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "FileId", headerName: "ID", width: 100 },
  { field: "FileName", headerName: "File Name", width: 250 },
  {
    field: "FileTime",
    headerName: "File Time",
    width: 300,
  },
  {
    field: "Success",
    headerName: "Success",
    width: 150,
  },
];

// const rows = [
//   {
//     id: 1,
//     fileName: "abc",
//     filetime: "123",
//     success: "성공",
//   },
//   {
//     id: 2,
//     fileName: "def",
//     filetime: "456",
//     success: "실패",
//   },
// ];

export default function File() {
  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    axios
      .get("/parsing")
      .then((response) => {
        // 데이터를 state에 저장
        setDbData(response.data.SmfFiles);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      });
  }, []);

  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={dbData}
            columns={columns}
            disableSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            getRowId={(row) => row.FileId}
            sx={{ height: 600, margin: "0 200px" }}
          />
        </div>
      </div>
    </div>
  );
}
