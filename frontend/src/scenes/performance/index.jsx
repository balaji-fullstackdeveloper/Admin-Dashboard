import { React } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetUserPerformanceQuery } from "../../state/api.js";
import { useSelector } from "react-redux";
import {
  GridColumnMenu,
  GridColumnMenuContainer,
  GridColumnMenuFilterItem,
  GridColumnMenuHideItem,
  DataGrid,
} from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Audio } from "react-loader-spinner";
function CustomColumnMenuComponent(props) {
  const { hideMenu, colDef, color, ...other } = props;

  if (colDef.field) {
    return (
      <GridColumnMenuContainer
        hideMenu={hideMenu}
        colDef={colDef}
        ownerState={{ color }}
        {...other}
      >
        <GridColumnMenuFilterItem onClick={hideMenu} colDef={colDef} />
        <GridColumnMenuHideItem onClick={hideMenu} colDef={colDef} />
      </GridColumnMenuContainer>
    );
  }

  return (
    <GridColumnMenu
      hideMenu={hideMenu}
      colDef={colDef}
      ownerState={{ color }}
      {...other}
    />
  );
}

function Performance() {
  const theme = useTheme();
  const userId = useSelector((state) => state.global.userId);

  const { data, isLoading } = useGetUserPerformanceQuery(userId);
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
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,

      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      type: "number",
      headerAlign: "start",
      align: "start",
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="PERFORMANCE"
        subtitle="Track your Affiliate Sales and Performance here"
      />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.sales) || []}
          columns={columns}
          slots={{
            columnMenu: CustomColumnMenuComponent,
          }}
        />
      </Box>
    </Box>
  );
}
export default Performance;
