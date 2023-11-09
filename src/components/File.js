import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import format from "date-fns/format";
import ko from "date-fns/locale/ko";
import Loading from "./Loading";

const columns = [
  {
    field: "FileId",
    headerName: "ID",
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "FileName",
    headerName: "FileName",
    width: 220,
    align: "center",
    headerAlign: "center",
    valueGetter: (params) => {
      const filePath = params.row.FileName;
      const parts = filePath.split(/[\\/]/);
      const fileName = parts[parts.length - 1];
      return fileName;
    },
  },
  {
    field: "FileTime",
    headerName: "SaveDate",
    width: 300,
    align: "center",
    headerAlign: "center",
    valueGetter: (params) => {
      return new Date(params.row.FileTime);
    },
    valueFormatter: (params) => {
      const date = params.value;
      const formattedDate = format(date, "yyyy/MM/dd HH:mm:ss", {
        locale: ko,
      });
      return formattedDate;
    },
  },
  {
    field: "Success",
    headerName: "Success",
    width: 150,
    align: "center",
    headerAlign: "center",
    valueGetter: (params) => (params.value === 0 ? "성공" : "실패"),
  },
];

export default function File() {
  const [dbData, setDbData] = useState([]);
  const [loading, setLoading] = useState(true);

  const mainApi = async () => {
    try {
      const response = await axios.get("/api/parsing/file");
      const data = response.data.SmfFiles;
      setDbData(data);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    mainApi();
  }, []);

  return (
    <div>
      <Loading isOpen={loading} />

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
            sx={{ height: 500, margin: "0 300px" }}
          />
        </div>
      </div>
    </div>
  );
}
