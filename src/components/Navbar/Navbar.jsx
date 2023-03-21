import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@emotion/react";
import { ColorModeContext } from "../../App";
import { IconButton } from "@mui/material";

export default function Navbar() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={theme.palette.mode === 'light' ? 'transparent' : 'default'}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Viral Nation
          </Typography>
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            <Button color="inherit">
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </Button>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
