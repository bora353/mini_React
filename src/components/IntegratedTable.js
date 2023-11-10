import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "../App.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const columns = [
  { id: "LotId", label: "LotId", minWidth: 20, align: "center" },
  { id: "LineId", label: "Line(DM)", minWidth: 20, align: "center" },
  {
    id: "StepId",
    label: "StepId",
    minWidth: 20,
    align: "center",
  },
  {
    id: "DeviceId",
    label: "DeviceId",
    minWidth: 20,
    align: "center",
  },
  {
    id: "EquipId",
    label: "EquipId",
    minWidth: 20,
    align: "center",
  },
  {
    id: "RecipeId",
    label: "RecipeId(DM)",
    minWidth: 20,
    align: "center",
  },
  {
    id: "line",
    label: "Line(RMS)",
    minWidth: 20,
    align: "center",
  },
  {
    id: "step_id",
    label: "StepId",
    minWidth: 20,
    align: "center",
  },
  {
    id: "equip_id",
    label: "EquipId",
    minWidth: 20,
    align: "center",
  },
  {
    id: "recipe_id",
    label: "RecipeId(RMS)",
    minWidth: 20,
    align: "center",
  },
];

const tableContainerStyle = {
  margin: "70px 200px 0 200px",
};

export default function IntegratedTable({
  selectedLine,
  selectedRecipe,
  integratedData,
  setIntegratedData,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터를 저장
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    axios
      .get("/api/integrated")
      .then((response) => {
        const rows = response.data.map((item) => ({
          id: item.Lot._id,
          LotId: item.Lot.LotId,
          LineId: item.Lot.LineId,
          StepId: item.Lot.StepId,
          DeviceId: item.Lot.DeviceId,
          EquipId: item.Lot.EquipId,
          RecipeId: item.Lot.RecipeId,
          line: item.StandardInfo.line,
          step_id: item.StandardInfo.step_id,
          equip_id: item.StandardInfo.equip_id,
          recipe_id: item.StandardInfo.recipe_id,
        }));

        setIntegratedData(rows); // 데이터를 상태에 저장
        setLoading(false);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
        setLoading(false);
      });
  }, [setIntegratedData]);

  // 필터링 함수
  const filterData = () => {
    let filtered = integratedData;

    // Line 필터링
    if (selectedLine) {
      filtered = filtered.filter((row) => row["LineId"] === selectedLine);
    }

    // 레시피 필터링
    if (selectedRecipe) {
      filtered = filtered.filter((row) => row["recipe_id"] === selectedRecipe);
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData(); // selectedLine이 변경될 때마다 필터링 함수 실행
  }, [selectedLine, selectedRecipe, integratedData]);

  const handleRowClick = (row) => {
    const selectedIndex = selectedRows.indexOf(row);
    let newSelected = [...selectedRows];

    if (selectedIndex === -1) {
      // 선택되지 않은 행을 선택
      newSelected.push(row);
    } else {
      // 이미 선택된 행을 선택 해제
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedRows(newSelected);
    console.log(newSelected);
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    const selectedData = selectedRows.map((row) => {
      return {
        LotId: row.LotId,
        LineId: row.LineId,
        StepId: row.StepId,
        DeviceId: row.DeviceId,
        EquipId: row.EquipId,
        RecipeId: row.RecipeId,
        line: row.line,
        step_id: row.step_id,
        equip_id: row.equip_id,
        recipe_id: row.recipe_id,
      };
    });

    // 선택한 데이터를 다음 경로로 전달합니다.
    // navigate("/integrateddata/rms", {
    //   state: { selectedData }, // selectedData를 경로로 전달
    // });

    // ---------------------테스트
    const queryString = Object.keys(selectedData)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(selectedData[key])}`
      )
      .join("&");

    const newTab = window.open(`/integrateddata/rms?${queryString}`, `_blank`);

    if (newTab) {
      newTab.focus();
    }
  };

  return (
    <div>
      <Loading isOpen={loading} />

      <div style={tableContainerStyle}>
        <Paper sx={{ width: "100%" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={6}
                    style={{
                      borderRight: "1px solid #e0e0e0",
                      borderTop: "1px solid #e0e0e0",
                      //borderBottom: "2px solid #e0e0e0",
                      //borderLeft: "2px solid #e0e0e0",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      DM
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={4}
                    style={{
                      //borderRight: "2px solid #e0e0e0",
                      borderTop: "1px solid #e0e0e0",
                      //borderBottom: "2px solid #e0e0e0",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      RMS
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      //style={{ top: 57, minWidth: column.minWidth }}
                      style={{
                        top: 57,
                        minWidth: column.minWidth,
                        //borderRight: "2px solid #e0e0e0",
                        fontWeight: "bold",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData // rows 대신 integratedData를 사용
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        className={
                          selectedRows.includes(row) ? "selected-row" : ""
                        }
                        onClick={() => handleRowClick(row)} // 클릭 이벤트 추가
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                //borderRight: "1px solid #e0e0e0",
                                minWidth: column.minWidth,
                              }}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredData.length} // rows.length 대신 integratedData.length 사용
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <div style={{ float: "right", marginTop: "10px" }}>
          <Button variant="contained" onClick={handleButtonClick}>
            조회하기
          </Button>
        </div>
      </div>
    </div>
  );
}
