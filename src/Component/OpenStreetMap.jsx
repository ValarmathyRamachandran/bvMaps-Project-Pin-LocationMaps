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
import { getmapLocation, PinnedLocation } from "../Service/AxioService";
import TabularView from "./TabluarView/TabluarView";
import DailogBox from "./DialogBox/DailogBox";


const markerIcon = new L.Icon({
    iconUrl: require('../../src/asset/markerImage.png'),
    iconSize: [25,35],
    iconAnchor:[17,46],// left/reight 
    popupAnchor:[0,-46]
})

const OpenStreetMap =(props) => {

   const [centre,setCentre] =useState({ lat: 13.084622, lng:80.248357});
   const [open, setOpen] = React.useState(false);
   const [getlatlngData,setlatlngData] =React.useState([]);
   const [locationdata,setlocationdata] = React.useState({lat:"",lng:"",user:"",Place:""})
   const[getsave,setsave] = React.useState(false);
   const [getdetails,setdetails] = React.useState([]);
   
   const [editmapdata,seteditmapdata] = React.useState(-1)

   const ZOOM_LEVEL = 9;
   const mapRef = useRef();


    const Listentoplace = (e) => {
    setlocationdata({...locationdata,Place:e.target.value})
    }
  

      const getMap =(data) =>{
        setOpen(true);
        console.log(data);
        const {lat, lng} = data.latlng
        let data1 = {
          lat:lat,
          lng:lng,
          user:localStorage.getItem("token")
        }
        setdetails(data1)
        console.log(data1)
      }

     
      const listenToDialogBox =(data) =>{
          if(data == true ){
            getlocation();
          }
      }

      const getlocation = () =>{
        getmapLocation().then((res) => {
        console.log(res)
      
         if(props.editdata){
          setlatlngData([props.editdata])
          seteditmapdata(props.editdata) 
          } else {
            setlatlngData(res.data)
            console.log(res.data)
          } 
          }).catch((err) => {console.log(err)
          })
      }


      React.useEffect(() =>{
        getlocation()
      },[])

    return (
        <>
            <div className="bvMaps-main">
                <div className="bvMaps-text">
                
                      <div className="map-container" > 
                      <MapContainer center={centre}
                                zoom={ZOOM_LEVEL}
                                ref={mapRef} 
                              
                                whenReady={(map) =>{map.target.on("click",function (e){
                                     console.log(e)
                                     const { lat, lng } = e.latlng;
                                      getMap(e)
                                });
                              }}>

                            <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution }
                            />

                    {getlatlngData.map((city,idx) => 
                    <Marker position={[city.lat, city.lng]} icon={markerIcon} key={idx}>
                                                <Popup>
                                                <b >Pin</b>
                                                </Popup>
                    
                    </Marker> )}
                      </MapContainer></div>
                      <div>
                      {open?<DailogBox getdetails={getdetails}  listenToDialogBox ={listenToDialogBox} editmapdata={editmapdata}  />: null}
      
      </div>
      </div>
      </div>
    </>
    )
}

export default OpenStreetMap;