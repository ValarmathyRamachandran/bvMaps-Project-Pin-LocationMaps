import React,{ useState } from "react";
import 'leaflet/dist/leaflet.css';
import{ MapContainer,TileLayer,Marker, Popup  } from "react-leaflet";
import osm from "../osm-providers";
import L from "leaflet"; 
import { useRef } from "react";
import { getOsmHeatMapMarker, postOsmHeatMap } from "../../Service/AxioService";
import { useEffect } from "react";

const markerIcon = new L.Icon({
    iconUrl: require('../../asset/markerImage.png'),
    iconSize: [25,35],
    iconAnchor:[17,46],// left/reight 
    popupAnchor:[0,-46]
})

const OsmHeatMap =(props) => {

   const [centre,setCentre] =useState({ lat: 20.5937, lng:78.9629});
   const [open, setOpen] = useState(false);
   const [latlngData,setlatlngData] =useState([]);
   const ZOOM_LEVEL = 4;
   const mapRef = useRef();


    const getMap =(data) =>{
        setOpen(true);
        const {lat, lng} = data.latlng
        let dataObj = {
            lat:lat,
            lng:lng,
            city:props.menudata
        };
        postOsmHeatMap(dataObj).then((res)=>{
            setlatlngData( latlngData=>[...latlngData ,{"lat":res.data.lat, "lng": res.data.lng}])
           
            }).catch((err)=> {
              console.log(err)})
              
    }

    const getMarkerData =() =>{
        
    getOsmHeatMapMarker().then((res) =>{
    var filteredArray = res.data.filter((obj) => {
        if(props.menudata.heatMapValue == obj.city.heatMapValue){
            return obj
          } 
        })
        setlatlngData(filteredArray)
    }).catch((err)=> {
    console.log(err)
    })
    }


    useEffect(() =>{
        getMarkerData()
    },[])
     
    const renderMarker = () => {
        return (
            latlngData.map((city) =>
            <Marker position={[city.lat, city.lng]} icon={markerIcon} >
            <Popup>
            <b >Pin</b>
            </Popup>
            
        </Marker> ))
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

                        <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                        {renderMarker()}
                      </MapContainer>
                    </div>
    </div>
</div>
    </>
    )
}



export default OsmHeatMap;