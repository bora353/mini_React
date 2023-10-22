import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "lotID", headerName: "lotID", width: 100 },
  { field: "WaferID", headerName: "WaferID", width: 100 },
  {
    field: "deviceID",
    headerName: "deviceID",
    type: "number",
    width: 100,
  },
  {
    field: "stepID",
    headerName: "stepID",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 100,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  { field: "equipID", headerName: "equipID", width: 100 },
  { field: "ppID", headerName: "ppID", width: 100 },
  { field: "resultTimestamp", headerName: "resultTimestamp", width: 150 },
  { field: "slotNo", headerName: "slotNo", width: 100 },
];

const rows = [
  {
    id: 1,
    lotID: 1,
    WaferID: "Snow",
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
    WaferID: "Snow",
    deviceID: "Jon",
    stepID: 35,
    equipID: 123,
    ppID: 456,
    resultTimestamp: "abc",
    slotNo: 1,
  },
];

export default function Lot_Wafer() {
  const [selectedRows, setSelectedRows] = useState(rows); // 선택된 행을 저장하는 상태

  const handleSelectionModelChange = (newSelection) => {
    setSelectedRows(newSelection.selectionModel);
    console.log("선택된 행:", newSelection.selectionModel);
  };

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
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={selectedRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onSelectionModelChange={handleSelectionModelChange}
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
    </div>
  );
}
