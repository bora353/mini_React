import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Route, Routes, Link } from "react-router-dom";
import DataSearchPage from "../pages/DataSearchPage";
import FileCheckPage from "../pages/FileCheckPage";
import SummaryPage from "../pages/SummaryPage";
import IntegratedDataPage from "../pages/IntegratedDataPage";

const pages = [
  { title: "통합데이터", path: "/integrateddata" },
  { title: "File Data", path: "/filecheck" },
  { title: "Summary", path: "/summary" },
];

export default function Bar() {
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#5F85bb" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
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
                  sx={{ mx: 1, color: "inherit" }}
                >
                  {page.title}
                </Button>
              ))}
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      <Routes>
        <Route path="/filecheck" element={<FileCheckPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/integrateddata" element={<IntegratedDataPage />} />
      </Routes>
    </div>
  );
}
