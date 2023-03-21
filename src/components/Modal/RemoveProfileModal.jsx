import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function RemoveProfileModal({ openModal, handleClose, handleSubmit }) {
  return (
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Removed profile will be deleted permenantly and won't be available anymore
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained"onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} autoFocus color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
   
  );
}