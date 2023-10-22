import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Defect from "./Defect";
import { Link } from "react-router-dom";

const rows = [
  {
    id: 1,
    lotID: 1,
    WaferID: "abc",
    deviceID: "Jon",
    stepID: 35,
    equipID: 123,
    ppID: 456,
    resultTimestamp: "abc",
    slotNo: 1,
  },
  {
    id: 2,
    lotID: 2,
    WaferID: "def",
    deviceID: "Jon",
    stepID: 53,
    equipID: 987,
    ppID: 888,
    resultTimestamp: "ggg",
    slotNo: 7,
  },
];

export default function Lot_Wafer() {
  const [selectedRows, setSelectedRows] = useState(rows);

  const handleSelectionModelChange = (newSelection) => {
    setSelectedRows(newSelection.selectionModel);
    console.log("선택된 행:", newSelection.selectionModel);
    console.log("상태!!:", selectedRows);
  };

  const [selectedWaferID, setSelectedWaferID] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "lotID", headerName: "LotID", width: 100 },
    { field: "WaferID", headerName: "WaferID", width: 100 },
    {
      field: "deviceID",
      headerName: "DeviceID",
      type: "number",
      width: 100,
    },
    {
      field: "stepID",
      headerName: "StepID",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 100,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "equipID", headerName: "EquipID", width: 100 },
    { field: "ppID", headerName: "PpID", width: 100 },
    { field: "resultTimestamp", headerName: "ResultTimestamp", width: 150 },
    { field: "slotNo", headerName: "SlotNo", width: 100 },
    {
      field: "select",
      headerName: "Select",
      width: 90,
      renderCell: (params) => {
        const handleRowClick = (waferID) => {
          setSelectedWaferID(waferID);
        };

        return (
          <button
            className="userListEdit"
            onClick={() => handleRowClick(params.row.WaferID)}
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

  // const [data, setData] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("/parsing")
  //     .then((response) => {
  //       console.log(response.data);
  //       //console.log(response.data.dataMapList[0].DEFECTID);
  //       //console.log(response.data.dataMapList[0]);
  //       //console.log(response.data.waferID);
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  return (
    <div style={{ marginTop: "50px" }}>
      <h3>Lot / Wafer </h3>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={selectedRows}
          columns={columns}
          disableSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          //checkboxSelection
          onSelectionModelChange={handleSelectionModelChange}
          //selectionModel={selectedRows}
        />
      </div>
      {/* {<p>lotID : {data.lotID}</p>}
  {<p>deviceID : {data.deviceID}</p>}
  {<p>stepID : {data.stepID}</p>}
  {<p>equipID : {data.equipID}</p>}
  {<p>ppID : {data.ppID}</p>}
  {<p>resultTimestamp : {data.resultTimestamp}</p>}
  {<p>slotNo : {data.slotNo}</p>}
  {<p>waferID : {data.waferID}</p>} */}
      <Defect selectedWaferID={selectedWaferID} />
    </div>
  );
}
