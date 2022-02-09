import React,{ useState } from "react";
import 'leaflet/dist/leaflet.css';
import{ MapContainer,TileLayer ,Marker, Popup } from "react-leaflet";
import osm from "./osm-providers"; 
import L from "leaflet"; 
import { useRef } from "react";
import '../Component/OpenStreetMap.css';
import Popper from '@mui/material/Popper';
import icon from '../../src/asset/markerImage.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const markerIcon = new L.Icon({
    iconUrl: require('../../src/asset/markerImage.png'),
    iconSize: [25,35],
    iconAnchor:[17,46],// left/reight 
    popupAnchor:[0,-46],
    
})
const OpenStreetMap =() => {
   const [centre,setCentre] =useState({ lat: 13.084622, lng:80.248357});
   const [open, setOpen] = React.useState(false);
   const ZOOM_LEVEL = 9;
     const mapRef = useRef();

     const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const getMap =(data) =>{
        console.log(data);
      }
   
    return (
        <>
            {/* <Header title="bv Maps" /> */}
            <div className="bvMaps-main">
                <div className="bvMaps-text">
                
                       <div className="map-container" > 
                       <MapContainer center={centre}
                                zoom={ZOOM_LEVEL}
                                ref={mapRef} 
                                whenReady={(map) =>{map.target.on("click",function (e){
                                     console.log(e)
                                      getMap(e.latlng.lat)
                                });
                              }}>
                              
                              

                            <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution }
                            />

                            <Marker position={[13.084622,80.248357]} icon={markerIcon}  >

                                <Popup>
                                    <b  onClick={handleClickOpen}>Pin location</b>
                                </Popup>
    
                            </Marker>
                        </MapContainer></div>
                        <div>

                        
      {/* <Button variant="outlined" >
        Open form dialog
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save your Location </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the location here:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="save your location name as "
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
 

                </div>
            </div>
        
        </>
    )
}

export default OpenStreetMap;