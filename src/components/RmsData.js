// import React, { useEffect, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import axios from "axios";
// import format from "date-fns/format";
// import ko from "date-fns/locale/ko";

// const columns = [
//   {
//     field: "Id123",
//     headerName: "Id123",
//     width: 300,
//     align: "center",
//     headerAlign: "center",
//   },
//   {
//     field: "Id456",
//     headerName: "Id456",
//     width: 300,
//     align: "center",
//     headerAlign: "center",
//   },
//   {
//     field: "version",
//     headerName: "version",
//     width: 80,
//     align: "center",
//     headerAlign: "center",
//   },
//   {
//     field: "recipeId",
//     headerName: "RecipeId",
//     width: 150,
//     align: "center",
//     headerAlign: "center",
//   },
//   {
//     field: "equipId",
//     headerName: "EquipId",
//     width: 120,
//     align: "center",
//     headerAlign: "center",
//   },
//   {
//     field: "stepId",
//     headerName: "StepId",
//     width: 120,
//     align: "center",
//     headerAlign: "center",
//   },
//   {
//     field: "coordinateX",
//     headerName: "CoordinateX",
//     width: 130,
//     align: "center",
//     headerAlign: "center",
//   },
//   {
//     field: "coordinateY",
//     headerName: "CoordinateY",
//     type: "number",
//     width: 130,
//     align: "center",
//     headerAlign: "center",
//   },
//   {
//     field: "idpName",
//     headerName: "IdpName name",
//     width: 160,
//     align: "center",
//     headerAlign: "center",
//   },
//   {
//     field: "idwName",
//     headerName: "IdwName",
//     width: 160,
//     align: "center",
//     headerAlign: "center",
//   },
//   {
//     field: "chipArrayX",
//     headerName: "ChipArrayX",
//     width: 110,
//     align: "center",
//     headerAlign: "center",
//   },
//   {
//     field: "chipArrayY",
//     headerName: "ChipArrayY",
//     width: 110,
//     align: "center",
//     headerAlign: "center",
//   },
//   {
//     field: "changeDate",
//     headerName: "ChangeDate",
//     width: 180,
//     align: "center",
//     headerAlign: "center",
//     valueGetter: (params) => {
//       if (params.value instanceof Date) {
//         return params.value;
//       } else {
//         // "yyyy-MM-ddTHH:mm:ss.fffZ" 형식의 문자열을 날짜로 변환
//         const date = new Date(params.value);
//         if (!isNaN(date)) {
//           return date;
//         }
//       }
//       // 유효한 날짜가 아닌 경우, 빈 문자열 반환
//       return "";
//     },
//     valueFormatter: (params) => {
//       if (params.value instanceof Date) {
//         const date = params.value;
//         const formattedDate = format(date, "yyyy/MM/dd HH:mm:ss", {
//           locale: ko,
//         });
//         return formattedDate;
//       } else {
//         return ""; // 날짜가 유효하지 않을 때 빈 문자열 반환
//       }
//     },
//   },
// ];

// export default function RmsData({ IntegratedRecipeId }) {
//   const [integratedRMSData, setIntegratedRMSData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("/api/integrated/rms")
//       .then((response) => {
//         const processedData = response.data.flatMap((result) => {
//           return result.joinedParameters.map((parameter, index) => ({
//             Id: `RMS_${result.standardInfo.id}_${index}`,
//             Id123: parameter.id,
//             Id456: result.standardInfo.id,
//             version: parameter.version,
//             recipeId: result.standardInfo.recipeId,
//             equipId: result.standardInfo.equipId,
//             stepId: result.standardInfo.stepId,
//             coordinateX: parameter.coordinateX,
//             coordinateY: parameter.coordinateY,
//             idpName: parameter.idpName,
//             idwName: parameter.idwName,
//             chipArrayX: parameter.chipArrayX,
//             chipArrayY: parameter.chipArrayY,
//             changeDate: parameter.changeDate,
//           }));
//         });

//         const filteredData = processedData.filter(
//           (item) => item.recipeId === IntegratedRecipeId
//         );

//         setIntegratedRMSData(filteredData);
//       })
//       .catch((error) => {
//         console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h3 style={{ margin: "10px 200px" }}>RMS Parameter</h3>

//       <div style={{ height: 400, width: "100%" }}>
//         <DataGrid
//           rows={integratedRMSData}
//           columns={columns}
//           getRowId={(row) => row.Id}
//           initialState={{
//             pagination: {
//               paginationModel: { page: 0, pageSize: 10 },
//             },
//           }}
//           pageSizeOptions={[5, 10]}
//           sx={{ height: 400, margin: "0 200px" }}
//           //checkboxSelection
//         />
//       </div>
//     </div>
//   );
// }
