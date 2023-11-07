import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Defect from "./Defect";
import { Link } from "react-router-dom";
import axios from "axios";
import Image from "../components/Image";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Button } from "@mui/material";
import format from "date-fns/format";
import ko from "date-fns/locale/ko";
import TransferModal from "./TransferModal";
import Loading from "./Loading";

export default function LotWafer({
  searchQuery,
  searchOption,
  startDate,
  endDate,
  dateType,
  selectedLotID,
}) {
  const [dbData, setDbData] = useState([]);
  const [selectedSlotNo, setSelectedSlotNo] = useState(null);
  const [selectedDefectNo, setSelectedDefectNo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/parsing")
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
          RecipeId: lot.Lots[0].RecipeId,
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      field: "Transfer",
      headerName: "Transfer",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <CustomButton rowData={params.row} />;
      },
    },
    // {
    //   field: "LotNo",
    //   headerName: "LotNo",
    //   width: 70,
    //   align: "center",
    //   headerAlign: "center",
    // },
    {
      field: "LotId",
      headerName: "LotId",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "WaferNo",
      headerName: "WaferId",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "LineId",
      headerName: "LineId",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "DeviceId",
      headerName: "DeviceId",
      type: "number",
      width: 110,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "EquipID",
      headerName: "EquipId",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "RecipeId",
      headerName: "RecipeId",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "StepId",
      headerName: "StepId",
      sortable: false,
      width: 170,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "PpID",
      headerName: "PpId",
      width: 170,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ScanTime",
      headerName: "ScanTime",
      width: 170,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => {
        return new Date(params.row.ScanTime);
      },
      valueGetter: (params) => {
        return new Date(params.row.ScanTime);
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
      field: "SaveDate",
      headerName: "SaveDate",
      width: 170,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => {
        return new Date(params.row.SaveDate);
      },
      valueFormatter: (params) => {
        const date = params.value;
        const formattedDate = format(date, "yyyy/MM/dd HH:mm:ss", {
          locale: ko,
        });
        return formattedDate;
      },
    },
    { field: "SlotId", headerName: "SlotNo", width: 70, align: "center" },
    {
      field: "SampleSize",
      headerName: "SampleSize",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "SampleCenterLocationX",
      headerName: "CenterLocationX",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "SampleCenterLocationY",
      headerName: "CenterLocationY",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "DiePitchX",
      headerName: "DiePitchX",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "DiePitchY",
      headerName: "DiePitchY",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
  ];

  const CustomButton = ({ rowData }) => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
      setOpenModal(true);
    };

    const handleCloseModal = () => {
      setOpenModal(false);
    };

    return (
      <>
        <div style={{ textAlign: "center" }}>
          <Link
            to="#"
            onClick={handleOpenModal}
            style={{ textDecoration: "none" }}
          >
            CSV <SaveAltIcon fontSize="small" style={{ cursor: "pointer" }} />
          </Link>
        </div>
        <TransferModal
          open={openModal}
          onClose={handleCloseModal}
          rowData={rowData}
        />
      </>
    );
  };

  //검색해서 데이터 필터링
  // const filteredData =
  //   searchOption === "LotID"
  //     ? dbData.filter((item) => {
  //         const result = item.LotId.includes(searchQuery);
  //         console.log("LotID 일때 체크", searchQuery, result);
  //         return result;
  //       })
  //     : searchOption === "WaferID"
  //     ? dbData.filter((item) => {
  //         const result = item.WaferNo === searchQuery;
  //         console.log("WaferID 일때 체크", searchQuery, result);
  //         return result;
  //       })
  //     : dbData;

  const filteredData =
    searchOption === "LotID" && searchQuery
      ? dbData.filter((item) => {
          const result = item.LotId.includes(searchQuery);
          console.log("LotID 일때 체크", searchQuery, result);
          return result;
        })
      : searchOption === "WaferID" && searchQuery
      ? dbData.filter((item) => {
          const result = item.WaferNo === searchQuery;
          console.log("WaferID 일때 체크", searchQuery, result);
          return result;
        })
      : dbData;

  const filteredByDateRange =
    dateType === "saveDate"
      ? filteredData.filter((item) => {
          const itemDate = new Date(item.SaveDate);
          const startDateDate = new Date(startDate);
          const endDateDate = new Date(endDate);
          return itemDate >= startDateDate && itemDate <= endDateDate;
        })
      : dateType === "scanDate"
      ? filteredData.filter((item) => {
          const scanTime = new Date(item.ScanTime);

          const scanTimeDate = new Date(scanTime);
          const startDateDate = new Date(startDate);
          const endDateDate = new Date(endDate);

          console.log("여긴 scanDate일때");
          // console.log(scanTimeDate);
          // console.log(startDateDate);
          // console.log(endDateDate);

          return scanTimeDate >= startDateDate && scanTimeDate <= endDateDate;
        })
      : filteredData.filter((item) => {
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

          console.log("여긴 saveDate이고 날짜 미선택시 default");
          // console.log(itemDate);
          // console.log(startOfDay);
          // console.log(endOfDay);
          return itemDate >= startOfDay && itemDate < endOfDay;
        });

  const filteredBySelectedLotID = selectedLotID
    ? filteredByDateRange.filter((item) => item.LotId === selectedLotID)
    : filteredByDateRange;

  const handleCellClick = (params) => {
    setSelectedSlotNo(params.row.SlotNo);
  };

  return (
    <div>
      <Loading isOpen={loading} />

      <div style={{ marginTop: "80px" }}>
        <h3 style={{ margin: "10px 200px" }}>Lot / Wafer </h3>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredBySelectedLotID}
            columns={columns}
            onCellClick={handleCellClick}
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
    </div>
  );
}
