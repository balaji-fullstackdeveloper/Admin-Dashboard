import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
function Header({ title, subtitle }) {
  const theme = useTheme();
  return (
    <Box>
      <Typography variant="h2" color={theme.palette.secondary[100]}>
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
}

export default Header;
