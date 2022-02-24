import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PostheatMap } from '../../Service/AxioService';

export default function DialogBoxHeatMap(props) {
    console.log(props)
    const[Open,setOpen] = React.useState(true);
    const[heatMapValue,setheatMapValue] =React.useState("")
    

    const handleClose = () => {
        setOpen(false);
    };

    const handleHeatmapLocation = (e) =>{
        setheatMapValue(e.target.value)
        props.handleDialogHeatMap(e.target.value)
    }


    const save = () =>{
        // if(props.editmapdata ){
        //   console.log(props.editmapdata.id)
            let data ={
            //   lat:props.getdetails.lat,
            //   lng:props.getdetails.lng,
              user:localStorage.getItem("token"),
              heatMapValue:heatMapValue
              
            }
            // Posteditdata(props.editmapdata.id,data)
            PostheatMap(data)
                .then((res)=>{
                 console.log(res)
                 
                 setOpen(false)     
                 }).catch((err)=> {
                   console.log(err)
              })
        }
    
              
  return (

          <Dialog open={Open} onClose={handleClose}>


              <DialogTitle>Add New HeatMap Location </DialogTitle>
              <DialogContent>
                  <DialogContentText>
                      Please enter the name here:
                  </DialogContentText>
                  <TextField
                      name="heatMapValue"
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Add new heatmap location name as "
                      type="text"
                      fullWidth
                      variant="standard" 
                      onChange={handleHeatmapLocation}/>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={save} >Ok </Button>
              </DialogActions>
          </Dialog>
  )
}

