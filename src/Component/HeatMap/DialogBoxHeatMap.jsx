import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DialogBoxHeatMap(props) {
    console.log(props)
    const[Open,setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

  return (

          <Dialog open={Open} onClose={handleClose}>


              <DialogTitle>Add New HeatMap Location </DialogTitle>
              <DialogContent>
                  <DialogContentText>
                      Please enter the name here:
                  </DialogContentText>
                  <TextField
                      name="Place"
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Add new heatmap location name as "
                      type="text"
                      fullWidth
                      variant="standard" />
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button>Ok</Button>
              </DialogActions>
          </Dialog>
  )
}

export default DialogBoxHeatMap