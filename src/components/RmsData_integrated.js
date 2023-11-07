import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import format from "date-fns/format";
import ko from "date-fns/locale/ko";

const columns = [
  // {
  //   field: "Id",
  //   headerName: "Id",
  //   width: 200,
  //   align: "center",
  //   headerAlign: "center",
  // },
  {
    field: "version",
    headerName: "Version",
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "recipeId",
    headerName: "RecipeId",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "equipId",
    headerName: "EquipId",
    width: 120,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "stepId",
    headerName: "StepId",
    width: 120,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "coordinateX",
    headerName: "CoordinateX",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "coordinateY",
    headerName: "CoordinateY",
    type: "number",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "idpName",
    headerName: "IdpName",
    width: 160,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "idwName",
    headerName: "IdwName",
    width: 160,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "chipArrayX",
    headerName: "ChipArrayX",
    width: 110,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "chipArrayY",
    headerName: "ChipArrayY",
    width: 110,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "changeDate",
    headerName: "ChangeDate",
    width: 180,
    align: "center",
    headerAlign: "center",
    valueGetter: (params) => {
      if (params.value instanceof Date) {
        return params.value;
      } else {
        // "yyyy-MM-ddTHH:mm:ss.fffZ" 형식의 문자열을 날짜로 변환
        const date = new Date(params.value);
        if (!isNaN(date)) {
          return date;
        }
      }
      // 유효한 날짜가 아닌 경우, 빈 문자열 반환
      return "";
    },
    valueFormatter: (params) => {
      if (params.value instanceof Date) {
        const date = params.value;
        const formattedDate = format(date, "yyyy/MM/dd HH:mm:ss", {
          locale: ko,
        });
        return formattedDate;
      } else {
        return ""; // 날짜가 유효하지 않을 때 빈 문자열 반환
      }
    },
  },
];

export default function RmsData_integrated({
  IntegratedRecipeId,
  setRmsSelectedData,
}) {
  const [integratedRMSData, setIntegratedRMSData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/integrated/rms2")
      .then((response) => {
        const processedData = response.data.map((item) => {
          return {
            Id: item._id,
            equipId: item.equip_id,
            device: item.device,
            stepId: item.step_id,
            version: item.version,
            collectDate: item.collect_date,
            idwName: item.idw_name,
            idpName: item.idp_name,
            chipArrayX: item.chip_array_x,
            chipArrayY: item.chip_array_y,
            stepPitchX: item.step_pitch_x,
            stepPitchY: item.step_pitch_y,
            waferSize: item.wafer_size,
            coordinateX: item.coordinate_x,
            coordinateY: item.coordinate_y,
            autoSave: item.auto_save,
            changeDate: item.change_date,
            isErrSave: item.is_err_save,
            recipeId: item.recipe_id,
            v: item.__v,
          };
        });

        const filteredData = processedData.filter(
          (item) => item.recipeId === IntegratedRecipeId
        );

        setIntegratedRMSData(filteredData);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      });
  }, []);

  const handleCellClick = (params) => {
    console.log("RMS 선택한 데이터:", params.row);
    setRmsSelectedData(params.row);
  };

  return (
    <div>
      <h3 style={{ margin: "10px 200px", color: "blue" }}>RMS Parameter</h3>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={integratedRMSData}
          columns={columns}
          getRowId={(row) => row.Id}
          onCellClick={handleCellClick}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
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
