import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "LotId", label: "LotId", minWidth: 50, align: "center" },
  { id: "LineId", label: "LineId", minWidth: 50, align: "center" },
  {
    id: "StepId",
    label: "StepId",
    minWidth: 50,
    align: "center",
  },
  {
    id: "DeviceId",
    label: "DeviceId",
    minWidth: 50,
    align: "center",
  },
  {
    id: "EquipId",
    label: "EquipId",
    minWidth: 50,
    align: "center",
  },
  {
    id: "RecipeId",
    label: "RecipeId",
    minWidth: 50,
    align: "center",
  },
  {
    id: "LineId",
    label: "LineId",
    minWidth: 50,
    align: "center",
  },
  {
    id: "StepId",
    label: "StepId",
    minWidth: 50,
    align: "center",
  },
  {
    id: "EquipId",
    label: "EquipId",
    minWidth: 50,
    align: "center",
  },
  {
    id: "RecipeId",
    label: "RecipeId",
    minWidth: 50,
    align: "center",
  },
];

const rows = [
  {
    LotId: 1,
    LineId: "Snow",
    StepId: "Jon",
    DeviceId: 35,
    EquipId: 55,
    RecipeId: 55,
    LineId: 33,
    StepId: 33,
    EquipId: 11,
    RecipeId: 4,
  },
];

const tableContainerStyle = {
  margin: "70px 50px 0 50px",
};

export default function IntegratedTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={tableContainerStyle}>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={6}
                  style={{ borderRight: "1px solid #e0e0e0" }}
                >
                  DM
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={4}
                  style={{ borderRight: "1px solid #e0e0e0" }}
                >
                  RMS
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
                      //borderRight: "1px solid #e0e0e0", // Vertical border
                      minWidth: column.minWidth,
                      //borderTop: "1px solid #e0e0e0", // Horizontal border
                      //borderBottom: "1px solid #e0e0e0", // Horizontal border
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              //borderRight: "1px solid #e0e0e0", // You can adjust the border style and color as needed
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
