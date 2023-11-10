import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Route, Routes, Link, Outlet } from "react-router-dom";
import FileCheckPage from "../pages/FileCheckPage";
import SummaryPage from "../pages/SummaryPage";
import IntegratedDataPage from "../pages/IntegratedDataPage";
import DataSearchPage from "../pages/DataSearchPage";

const pages = [
  { title: "데이터조회", path: "/dmdata" },
  { title: "통합조회", path: "/integrateddata" },
  { title: "파일목록조회", path: "/filecheck" },
];

export default function Bar() {
  const location = useLocation();

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#5F85bb" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              noWrap
              //component={Link}
              //to="/"
              sx={{
                fontWeight: 500,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Data Manager
            </Typography>

            <div>
              {pages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={page.path}
                  // sx={{ mx: 1, color: "inherit" }}
                  sx={{
                    mx: 1,
                    color:
                      (location.pathname === "/" && page.path === "/dmdata") ||
                      location.pathname === page.path
                        ? "#0a0a5c"
                        : "inherit",
                    fontWeight: 600,
                  }}
                >
                  {page.title}
                </Button>
              ))}
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      <Routes>
        <Route path="/dmdata" element={<DataSearchPage />} />
        <Route path="/integrateddata" element={<IntegratedDataPage />} />
        <Route path="/filecheck" element={<FileCheckPage />} />
      </Routes>
    </div>
  );
}
