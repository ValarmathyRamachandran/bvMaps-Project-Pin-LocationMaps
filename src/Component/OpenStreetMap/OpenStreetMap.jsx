import React,{ useState } from "react";
import 'leaflet/dist/leaflet.css';
import{ MapContainer,TileLayer ,Marker, Popup } from "react-leaflet";

import L from "leaflet"; 
import { useRef } from "react";
import"./OpenStreetMap.scss";

import { getmapLocation,postOsmHeatMap } from "../../Service/AxioService";
import DailogBox from "../DialogBox/DailogBox";
import osm from "../osm-providers";


const markerIcon = new L.Icon({
    iconUrl: require('../../asset/markerImage.png'),
    iconSize: [25,35],
    iconAnchor:[17,46],// left/reight 
    popupAnchor:[0,-46]
})

const OpenStreetMap =(props) => {

   const [centre,setcentre] =useState({ lat:20.5937,lng:78.9629});
   const [open, setOpen] = useState(false);
   const [latlngData,setlatlngData] =useState([]);
   const [locationdata,setlocationdata] = useState({lat:"",lng:"",user:"",Place:""})
   const[getsave,setsave] = useState(false);
   const [getdetails,setdetails] = useState([]);
   
   
   const [editmapdata,seteditmapdata] = React.useState(-1)

   const ZOOM_LEVEL = 5;
   const mapRef = useRef();


    const Listentoplace = (e) => {
    setlocationdata({...locationdata,Place:e.target.value})
    }
  

      const getMap =(data) =>{
        setOpen(true);
        console.log(data.latlng);
        const {lat, lng} = data.latlng
        let data1 = {
          lat:lat,
          lng:lng,
          user:localStorage.getItem("token"),
          city:props.Place
        }
        setdetails(data1)
        console.log(data1)
            
  
      }

     
      const listenToDialogBox =(data) =>{
        setOpen(data)
          if(data == false ){
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

      // const renderMarker = () => {
      //   return (
      //     getlatlngData.map((city,idx) => 
      //       <Marker position={[city.lat, city.lng]} icon={markerIcon} key={idx}>
      //                                   <Popup>
      //                                   <b >Pin</b>
      //                                   </Popup>
            
      //       </Marker> )
      //   )
      // }
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
        <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution }/>
                      {/* {props.showMarker? renderMarker():null} */}
                      {latlngData.map((city,idx) => 
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