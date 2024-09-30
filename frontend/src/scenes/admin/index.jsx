import * as React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetAdminsQuery } from "../../state/api.js";
import { Audio } from "react-loader-spinner";
import {
  GridColumnMenu,
  GridColumnMenuContainer,
  GridColumnMenuFilterItem,
  GridColumnMenuHideItem,
  DataGrid,
} from "@mui/x-data-grid";
import Header from "../../components/Header";

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

function Admin() {
  const theme = useTheme();
  const { data, isLoading } = useGetAdminsQuery();
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
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="Managing admins and List of admins" />
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
          rows={data || []}
          columns={columns}
          slots={{
            columnMenu: CustomColumnMenuComponent,
          }}
        />
      </Box>
    </Box>
  );
}
export default Admin;
