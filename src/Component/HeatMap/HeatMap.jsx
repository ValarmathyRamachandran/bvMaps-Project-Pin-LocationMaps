import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
// import { Button } from "@mui/material";
import { getOsmHeatMapMarker } from "../../Service/AxioService";


import "../HeatMap/HeatMap.scss";
import Button from '@mui/material/Button';


export default function HeatMap(props) {
console.log(props.osmHeatMap.heatMapValue)
    const[cityheatmap,setcityheatmap] =React.useState([])

 

    useEffect(() => {
      getOsmHeatMapMarker().then((res) => {
        console.log(res)
        var filteredArray = res.data.filter((obj) => {
          if(props.osmHeatMap.heatMapValue == obj.city.heatMapValue){
            return obj
          }
          // console.log(obj.city.heatMapValue)
      })
      
      console.log(filteredArray)  
      var container = L.DomUtil.get('map');
      if(container != null){
        container._leaflet_id = null;
      }
        var map = L.map("map").setView([20.5937, 78.9629], 5);
         L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        const points = filteredArray
        ? filteredArray.map((p) => {
          console.log(p.lat,p.lng)
            return [p.lat, p.lng];
          })
         
        : console.log(" hello");
        
      L.heatLayer(points).addTo(map);

        // setcityheatmap(filteredArray)
      }).catch((error) => {console.log(error)})  
      
          }, [props.osmHeatMap.heatMapValue]);

  
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
  