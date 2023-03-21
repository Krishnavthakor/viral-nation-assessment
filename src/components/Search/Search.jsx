import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Search({ searchText, onChange }) {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
        <TextField fullWidth id="outlined-search" label="Search field" type="search" size="small" value={searchText} onChange={(e) => onChange(e.target.value)}/>
    </Box>
  );
}


