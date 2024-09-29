// import {
//   GridColumnMenuContainer,
//   GridColumnMenuFilterItem,
//   GridColumnMenuHideItem,
//   StyledGridColumnMenuContainer,
// } from "@mui/x-data-grid";

// const CustomColumnMenu = (props) => {};

// export default CustomColumnMenu;
import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import {
  GridColumnMenu,
  GridColumnMenuContainer,
  GridColumnMenuFilterItem,
  GridColumnMenuSortItem,
} from "@mui/x-data-grid";

export function CustomColumnMenuComponent(props) {
  const { hideMenu } = props;

  return (
    <GridColumnMenuContainer hideMenu={hideMenu}>
      <GridColumnMenuSortItem onClick={hideMenu} />
      <GridColumnMenuFilterItem onClick={hideMenu} />
    </GridColumnMenuContainer>
  );
}
