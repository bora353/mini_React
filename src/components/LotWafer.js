import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Defect from "./Defect";
import { Link } from "react-router-dom";
import axios from "axios";
import Image from "../components/Image";

export default function LotWafer({
  searchQuery,
  searchOption,
  startDate,
  endDate,
  dateType,
}) {
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

  // 검색해서 데이터 필터링
  const filteredData =
    searchOption === "LotID"
      ? dbData.filter((item) => item.LotId.includes(searchQuery))
      : searchOption === "WaferID" // searchOption가 LotID가 아니고 WaferID 인가?
      ? dbData.filter((item) => item.WaferNo === searchQuery)
      : dbData;

  console.log("Lot Wafer dateType:", dateType);
  console.log("startDate:", startDate);
  console.log("endDate:", endDate);

  // ScanTime 및 SaveDate에 따른 필터링
  function parseScanTime(scanTime) {
    if (!scanTime) {
      return null; // 또는 다른 기본값으로 대체
    }

    const [datePart, timePart] = scanTime.split(" ");
    const [month, day, year] = datePart.split("-");
    const [hour, minute, second] = timePart.split(":");
    const formattedTime = `20${year}-${month}-${day}T${hour}:${minute}:${second}`;

    return new Date(formattedTime);
  }

  const filteredByDateRange =
    dateType === "saveDate"
      ? filteredData.filter((item) => {
          const today = new Date();
          const startOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          );
          const endOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1
          );
          const itemDate = new Date(item.SaveDate);

          console.log("여긴 saveDate일때");
          console.log(itemDate);
          console.log(startOfDay);
          console.log(endOfDay);
          return itemDate >= startOfDay && itemDate < endOfDay;
        })
      : dateType === "scanDate"
      ? filteredData.filter((item) => {
          const scanTime = parseScanTime(item.ScanTime);

          const scanTimeDate = new Date(scanTime);
          const startDateDate = new Date(startDate);
          const endDateDate = new Date(endDate);

          console.log("여긴 scanDate일때");
          console.log(scanTimeDate);
          console.log(startDateDate);
          console.log(endDateDate);

          return scanTimeDate >= startDateDate && scanTimeDate <= endDateDate;
        })
      : filteredData;

  //console.log(filteredByDateRange);

  return (
    <div style={{ marginTop: "80px" }}>
      <h3 style={{ margin: "10px 200px" }}>Lot / Wafer </h3>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredByDateRange}
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
        setSelectedDefectNo={setSelectedDefectNo}
      />
      <Image
        selectedSlotNo={selectedSlotNo}
        selectedDefectNo={selectedDefectNo}
        setSelectedSlotNo={setSelectedSlotNo}
        setSelectedDefectNo={setSelectedDefectNo}
      />
    </div>
  );
}
