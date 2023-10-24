import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Defect from "./Defect";
import { Link } from "react-router-dom";
import axios from "axios";
import Image from "../components/Image";

export default function Lot_Wafer() {
  const [dbData, setDbData] = useState([]);
  const [selectedSlotNo, setSelectedSlotNo] = useState(null);
  const [selectedDefectNo, setSelectedDefectNo] = useState(null);

  //const [selectedRows, setSelectedRows] = useState([]);

  // const handleSelectionModelChange = (newSelection) => {
  //   setSelectedRows(newSelection.selectionModel);
  //   console.log("선택된 행:", newSelection.selectionModel);
  //   console.log("상태!!:", selectedRows);
  // };

  useEffect(() => {
    axios
      .get("/parsing")
      .then((response) => {
        // "LotWafers" 배열의 각 요소를 별도의 행으로 변환
        const rows = response.data.LotWafers.map((lot) => ({
          id: lot.LotNo,
          LotNo: lot.LotNo,
          LotId: lot.Lots[0].LotId,
          WaferNo: lot.Lots[0].Wafers[0].WaferNo,
          LineId: lot.Lots[0].LineId,
          DeviceId: lot.Lots[0].DeviceId,
          StepId: lot.Lots[0].StepId,
          EquipID: lot.Lots[0].EquipId,
          PpID: lot.Lots[0].PpId,
          ScanTime: lot.Lots[0].ScanTime,
          SaveDate: lot.Lots[0].SaveDate,
          SlotId: lot.Lots[0].Wafers[0].SlotId,
          SlotNo: lot.Lots[0].Wafers[0].SlotNo,
          SampleSize: lot.Lots[0].Wafers[0].SampleSize,
          SampleCenterLocationX: lot.Lots[0].Wafers[0].SampleCenterLocationX,
          SampleCenterLocationY: lot.Lots[0].Wafers[0].SampleCenterLocationY,
          DiePitchX: lot.Lots[0].Wafers[0].DiePitchX,
          DiePitchY: lot.Lots[0].Wafers[0].DiePitchY,
        }));

        setDbData(rows);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      });
  }, []);

  const columns = [
    { field: "LotNo", headerName: "LotNo", width: 50 },
    { field: "SlotNo", headerName: "SlotNo(지워)", width: 50 },
    { field: "LotId", headerName: "LotID", width: 100 },
    { field: "WaferNo", headerName: "WaferID", width: 100 },
    { field: "LineId", headerName: "LineId", width: 100 },
    {
      field: "DeviceId",
      headerName: "DeviceID",
      type: "number",
      width: 100,
    },
    {
      field: "StepId",
      headerName: "StepID",
      //description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
    },
    { field: "EquipID", headerName: "EquipID", width: 100 },
    { field: "PpID", headerName: "PpID", width: 100 },
    { field: "ScanTime", headerName: "ScanTime", width: 150 },
    { field: "SaveDate", headerName: "SaveDate", width: 200 },
    { field: "SlotId", headerName: "SlotNo", width: 100 },
    { field: "SampleSize", headerName: "SampleSize", width: 100 },
    {
      field: "SampleCenterLocationX",
      headerName: "SampleCenterLocationX",
      width: 200,
    },
    {
      field: "SampleCenterLocationY",
      headerName: "SampleCenterLocationY",
      width: 200,
    },
    { field: "DiePitchX", headerName: "DiePitchX", width: 150 },
    { field: "DiePitchY", headerName: "DiePitchY", width: 150 },
    {
      field: "select",
      headerName: "Select",
      width: 90,
      renderCell: (params) => {
        const handleRowClick = (SlotNo) => {
          setSelectedSlotNo(SlotNo);
        };

        return (
          <button
            className="userListEdit"
            onClick={() => handleRowClick(params.row.SlotNo)}
          >
            상세보기
          </button>
        );
      },
    },
    {
      field: "summary",
      headerName: "summary",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/summary/"}>
              <button className="userListEdit">summary</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div style={{ marginTop: "50px" }}>
      <h3 style={{ margin: "10px 200px" }}>Lot / Wafer </h3>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={dbData}
          columns={columns}
          disableSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          getRowId={(row) => row.LotNo}
          sx={{ margin: "0 200px" }}
          //onSelectionModelChange={handleSelectionModelChange}
          //checkboxSelection
          //selectionModel={selectedRows}
        />
      </div>
      <Defect
        selectedSlotNo={selectedSlotNo}
        selectedDefectNo={selectedDefectNo}
        setSelectedDefectNo={setSelectedDefectNo}
      />
      <Image
        selectedSlotNo={selectedSlotNo}
        selectedDefectNo={selectedDefectNo}
      />
    </div>
  );
}
