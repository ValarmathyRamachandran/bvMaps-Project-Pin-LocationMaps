import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
// import { Button } from "@mui/material";
import { LocationPoints } from "./LocationPoints";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import "../HeatMap/HeatMap.scss";
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import zIndex from "@mui/material/styles/zIndex";

export default function HeatMap() {

  <div className="header">
    <div className="icon">
      {/* onClick={() => setIsOpened(!isOpened)}> */}
      {/* {isOpened ? <ChevronLeftIcon /> : <MenuIcon />} */}
    </div>
    <div className="header-title">{' '}bv Maps</div></div>
    
    useEffect(() => {
      
        var map = L.map("map").setView([-37.87, 175.475], 12);
        <><div><button>Add More Location</button>
        <button>Add new Heat Map</button></div><div className="heatMap-btn" sx={{ height: '50px'  ,zIndex:'700' }}></div></>
    
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const points = LocationPoints
        ? LocationPoints.map((p) => {
            return [p[0], p[1]];
          })
        : [];
  
      L.heatLayer(points).addTo(map);
    }, []);
  
    return <div id="map" style={{ height: "100vh" }}>
       <><Button variant="contained">Add More Locations</Button>
  <Button variant="contained" onClick={Dialog}>Add Heatmap</Button></>
    </div>;

<div className="footer">@bv-maps.com</div>
  
  }
  