import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

export default function Defect({
  selectedSlotNo = null,
  setSelectedDefectNo = () => {},
}) {
  const [defectData, setDefectData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    { field: "DefectNo", headerName: "DefectNo", width: 100 },
    { field: "DefectId", headerName: "DefectId", width: 100 },
    { field: "XRel", headerName: "XRel", width: 130 },
    { field: "YRel", headerName: "YRel", width: 130 },
    { field: "XIndex", headerName: "XIndex" },
    { field: "YIndex", headerName: "YIndex" },
    { field: "RoughBinNumber", headerName: "RoughBinNumber", width: 160 },
    { field: "FineBinNumber", headerName: "FineBinNumber", width: 160 },
    // {
    //   field: "select",
    //   headerName: "Select",
    //   width: 90,
    //   renderCell: (params) => {
    //     const handleRowClick = (DefectNo) => {
    //       setSelectedDefectNo(DefectNo);
    //     };

    //     return (
    //       <button
    //         className="userListEdit"
    //         onClick={() => handleRowClick(params.row.DefectNo)}
    //       >
    //         버튼없애기
    //       </button>
    //     );
    //   },
    // },
  ];

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

  const handleCellClick = (params) => {
    if (selectedRows.includes(params.row.DefectNo)) {
      // setSelectedRows((prevSelected) =>
      //   prevSelected.filter((defectNo) => defectNo !== params.row.DefectNo)
      // );
      //setSelectedDefectNo(null); // 선택 해제
      console.log("DefectNo deselected:", params.row.DefectNo); // 선택 해제 시 로그
    } else {
      // setSelectedRows((prevSelected) => [params.row.DefectNo]);
      setSelectedDefectNo(params.row.DefectNo); // 선택
      console.log("DefectNo selected:", params.row.DefectNo); // 선택 시 로그
    }
  };

  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        <h3 style={{ margin: "10px 200px" }}>Defect</h3>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            //checkboxSelection
            onCellClick={handleCellClick}
            //selectionModel={selectedRows}
            // onSelectionModelChange={(newSelection) => {
            //   setSelectedRows(newSelection);
            // }}
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
