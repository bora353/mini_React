import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  {
    field: "Id",
    headerName: "Id",
    width: 70,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "recipeId",
    headerName: "RecipeId",
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "equipId",
    headerName: "EquipId",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "stepId",
    headerName: "StepId",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "coordinateX",
    headerName: "CoordinateX",
    width: 170,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "coordinateY",
    headerName: "CoordinateY",
    type: "number",
    width: 170,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "idpName",
    headerName: "IdpName name",
    width: 160,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "idwName",
    headerName: "IdwName",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "chipArrayX",
    headerName: "ChipArrayX",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "chipArrayY",
    headerName: "ChipArrayY",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
];

const rows = [
  { id: 1, recipeId: "Snow", firstName: "Jon", age: 35 },
  { id: 2, recipeId: "dd", firstName: "Cersei", age: 42 },
];

export default function RmsData() {
  const [integratedRMSData, setIntegratedRMSData] = useState([]);

  useEffect(() => {
    axios
      .get("/integrated/rms")
      .then((response) => {
        const processedData = response.data.map((result, index) => ({
          Id: `row-${index}`,
          recipeId: result.standardInfo.recipeId,
          equipId: result.standardInfo.equipId,
          stepId: result.standardInfo.stepId,
          coordinateX: result.joinedParameters[0].coordinateX,
          coordinateY: result.joinedParameters[0].coordinateY,
          idpName: result.joinedParameters[0].idpName,
          idwName: result.joinedParameters[0].idwName,
          chipArrayX: result.joinedParameters[0].chipArrayX,
          chipArrayY: result.joinedParameters[0].chipArrayY,
        }));
        setIntegratedRMSData(processedData);

        // const processedData = response.data.map((result, index) => ({
        //   StandardInfo: {
        //     //Id: result.standardInfo.id,
        //     Id: `row-${index}`,
        //     //EquipId: result.standardInfo.equipId,
        //     //StepId: result.standardInfo.stepId,
        //     //RecipeId: result.standardInfo.recipeId,
        //   },
        //   JoinedParameters: result.joinedParameters.map(
        //     (joinedParameter, innerIndex) => ({
        //       //Id: joinedParameter.id,
        //       Id: `row-${index}-${innerIndex}`,
        //       EquipId: joinedParameter.equipId,
        //       StepId: joinedParameter.stepId,
        //       RecipeId: joinedParameter.recipeId,
        //       CoordinateX: joinedParameter.coordinateX,
        //     })
        //   ),
        // }));
        // setIntegratedRMSData(processedData);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      });
  }, []);

  return (
    <div>
      <h3 style={{ margin: "10px 200px" }}>RMS Data(필터링필요)</h3>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={integratedRMSData}
          columns={columns}
          getRowId={(row) => row.Id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ height: 400, margin: "0 200px" }}
          //checkboxSelection
        />
      </div>
    </div>
  );
}
