import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
// import { Button } from "@mui/material";
import { getOsmHeatMap,get, getOsmHeatMapMarker } from "../../Service/AxioService";

import "../HeatMap/HeatMap.scss";
import Button from '@mui/material/Button';


export default function HeatMap(props) {
 const[Locpoints,setLocPoints] = React.useState([])
    
    useEffect(() => {
      
        var map = L.map("map").setView([-37.87, 175.475], 12);
         L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        const points = getOsmHeatMapMarker().then((res) =>{
            console.log(res.data)
            setLocPoints(res.data)
        }).catch((err) => {console.log(err)
          })
        ? Locpoints.map((p) => {
            return [p[0], p[1]];
          })
        : [];
  
      L.heatLayer(points).addTo(map);
    }, []);

  
    return(
      <div className="heatMap-main">

          <div className="btn-container">
          <Button className="addLocation-btn" variant="contained" onClick={props.handleAddMoreLoc}>Add More Location</Button>
          <Button className="addMap-btn"variant="contained" onClick={props.update} >Add new Heat Map</Button>
          </div>
    <div id="map" style={{ height: "100vh" }}>
    </div>
      </div>
    )   
  }
  