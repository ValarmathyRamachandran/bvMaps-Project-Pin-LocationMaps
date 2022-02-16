import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PinnedLocation, getmapLocation,Posteditdata } from '../../Service/AxioService';

export default function DailogBox(props) {
  console.log(props)
    const[Open,setOpen] = React.useState(true);
    const[placeValue,setplaceValue]  = React.useState("")
    console.log(props)

    const handleClose = () => {
        setOpen(false);
    };

    const Listentoplace = (e) =>{
        setplaceValue(e.target.value)
    }

    const save = () =>{
        if(props.editmapdata ){
          console.log(props.editmapdata.id)
            let data ={
              lat:props.getdetails.lat,
              lng:props.getdetails.lng,
              user:localStorage.getItem("token"),
              Place:placeValue
          
            }
              Posteditdata(props.editmapdata.id,data)
                .then((res)=>{
                 console.log(res)
                 setOpen(false)     
                 }).catch((err)=> {
                   console.log(err)
              })         
        }else{ 
          let  saveObj = {
          lat:props.getdetails.lat,
          lng:props.getdetails.lng,
          user:localStorage.getItem("token"),
          Place:placeValue
          }
        PinnedLocation(saveObj).then((res)=> {
            console.log(res)
            setOpen(false);
            props.listenToDialogBox(true)
          }).catch((err)=>{
            console.log(err)
         })}
    }

  return (
    <div>
    <Dialog open={Open} onClose={handleClose}>
    <DialogTitle>Save your Location </DialogTitle>
    <DialogContent>
      <DialogContentText>
        Please enter the location here:
      </DialogContentText>
      <TextField
        name="Place"
        autoFocus
        margin="dense"
        id="name"
        label="save your location name as "
        type="text"
        fullWidth
        variant="standard"
        onChange={Listentoplace}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={save}   >Ok</Button>
    </DialogActions>
  </Dialog></div>
  )
}

