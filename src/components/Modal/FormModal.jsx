import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, FormGroup, Switch } from "@mui/material";

export default function FormModal(props) {
  const { title, open, onCloseModal, formInputs, btnLabel, onSubmit } = props;
  const [form, setForm] = React.useState({});

  React.useEffect(() => {
    setForm({
      imageLink: formInputs?.image_url || "",
      firstName: formInputs?.first_name || "",
      lastName: formInputs?.last_name || "",
      email: formInputs?.email || "",
      description: formInputs?.description || "",
      isVerified: formInputs?.is_verified || false,
    });
  }, [open, formInputs]);

  const submitForm = () => {
    const data = {
      imageUrl: form.imageLink,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.lastName,
      updateProfileId: formInputs?.id,
      description: form.description,
      isVerified: form.isVerified,
    };
    onSubmit(data);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Dialog open={open} onClose={onCloseModal} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off">
          <FormGroup>
            <div
              style={{
                display: "flex",
                rowGap: "1rem",
                flexDirection: "column",
              }}
            >
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Image Uri"
                name="imageLink"
                defaultValue={form?.imageLink}
                onChange={handleOnChange}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  columnGap: "0.5rem",
                }}
              >
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="First Name"
                  name="firstName"
                  defaultValue={form?.firstName}
                  onChange={handleOnChange}
                />

                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="Last Name"
                  name="lastName"
                  defaultValue={form?.lastName}
                  onChange={handleOnChange}
                />
              </div>

              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Email"
                name="email"
                defaultValue={form?.email}
                onChange={handleOnChange}
              />

              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Description"
                name="description"
                defaultValue={form?.description}
                onChange={handleOnChange}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#D3D3D3",
                  padding: "0.5rem",
                }}
              >
                Talent is verified
                <Switch
                  checked={form?.isVerified}
                  onChange={() =>
                    setForm({ ...form, isVerified: !form.isVerified })
                  }
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
          </FormGroup>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={submitForm}
          style={{ marginTop: "2rem" }}
        >
          {btnLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
