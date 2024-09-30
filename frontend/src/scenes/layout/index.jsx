import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useGetUserQuery } from "../../state/api.js";
import { Audio } from "react-loader-spinner";
function Layout() {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetUserQuery(userId);
  if (isLoading) {
    return (
      <Box
        width="100%"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Audio
          height="100"
          width="100"
          radius="12"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </Box>
    );
  }
  return (
    <div>
      <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <Sidebar
          user={data || {}}
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box flexGrow={1}>
          <Navbar
            user={data || {}}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}

export default Layout;
