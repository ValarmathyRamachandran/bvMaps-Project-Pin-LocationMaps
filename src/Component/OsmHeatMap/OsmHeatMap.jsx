import React,{ useState } from "react";
import 'leaflet/dist/leaflet.css';
import{ MapContainer,TileLayer,Marker, Popup  } from "react-leaflet";
import osmProviders from "../osm-providers";
import L from "leaflet"; 
import { useRef } from "react";
import DailogBox from "../DialogBox/DailogBox";
import { postOsmHeatMap, getOsmHeatMapMarker } from "../../Service/AxioService";

const markerIcon = new L.Icon({
    iconUrl: require('../../asset/markerImage.png'),
    iconSize: [25,35],
    iconAnchor:[17,46],// left/reight 
    popupAnchor:[0,-46]
})

const OsmHeatMap =(props) => {

   const [centre,setCentre] =useState({ lat: 13.084622, lng:80.248357});
   const [open, setOpen] = useState(false);
   const [latlngData,setlatlngData] =useState();


   const ZOOM_LEVEL = 9;
   const mapRef = useRef();

  

    const getMap =(data) =>{
        setOpen(true);
        console.log('inside getmap',props.menudata);
        const {lat, lng} = data.latlng
        let dataObj = {
            lat:lat,
            lng:lng,
            city:props.menudata
        };
        postOsmHeatMap(dataObj).then((res)=>{
            console.log(res.data) 
            setlatlngData(res.data)
            }).catch((err)=> {
              console.log(err)})
              
    }

     
    const renderMarker = () => {
        console.log('inside marker OSM');
        return (
            latlngData!=null && <Marker position={[latlngData.lat, latlngData.lng]} icon={markerIcon} >
                                        <Popup>
                                        <b >Pin</b>
                                        </Popup>
            
            </Marker> )
    }

    return (
        <>
            <div className="bvMaps-main">
                <div className="bvMaps-text">
                
                      <div className="map-container" > 
                      <MapContainer center={centre}
                                zoom={ZOOM_LEVEL}
                                ref={mapRef} 
                              
                                whenReady={(map) =>{map.target.on("click",function (e){
                                     console.log('test',e)
                                     const { lat, lng } = e.latlng;
                                      getMap(e)
                                });
                              }}>

                        <TileLayer url={osmProviders.maptiler.url} attribution={osmProviders.maptiler.attribution} />
                        {renderMarker()}
                 {/* {true? renderMarker():null}  */}
                      </MapContainer></div>
                      <div>
                      {/* {open?<DailogBox  />:null} */}
                      
      </div>
      </div>
      </div>
    </>
    )
}



export default OsmHeatMap;