import * as React from "react";
import Button from "@mui/material/Button";

export default function ButtonComponent(props) {
    const { label, icon, onHandleClick } = props;
  return (
    <Button variant="outlined" startIcon={icon} onClick={onHandleClick}>
      {label}
    </Button>
  );
}
