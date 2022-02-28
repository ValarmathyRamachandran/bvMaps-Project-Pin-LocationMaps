import "./Dashboard.scss";
import React from "react";
import { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import OpenStreetMap from "../../Component/OpenStreetMap/OpenStreetMap";
import Switch from '@mui/material/Switch';
import TabularView from "../../Component/TabluarView/TabluarView";
import HeatMap from "../../Component/HeatMap/HeatMap";
import DialogBoxHeatMap from "../../Component/HeatMap/DialogBoxHeatMap";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { List } from "@mui/material";
import { getheatMap } from "../../Service/AxioService";
import OsmHeatMap from "../../Component/OsmHeatMap/OsmHeatMap";
import { useNavigate } from 'react-router-dom';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Dashboard ({ children ,props}) {
  const navigate = useNavigate()

  const [isOpened, setIsOpened] = useState(false);
  const [checked,setChecked]= useState(true)
  const [heatMap,setHeatMap] =useState(false)
  const[showAddNew,setShowAddNew] = useState(false)
  const [heatmapData,setheatmapData] =React.useState([])
  const [showMarker,setShowMarker] = useState(true)
  const [showMarkerOSM, setShowMarkerOSM]=useState(false)
  const[sideMenu,setsideMenu] = useState(false)
  const[osmHeatMap,setosmHeatMap] = useState("")
  const [city,setcity] =useState("");

  const updateAddNew = () =>{
    setChecked(false)
    setHeatMap(true)
    setShowAddNew(true)
  }

  const handleAddMoreLoc = () => {
    setChecked(false);
    setShowMarker(false)
    setHeatMap(false)
    setsideMenu(true)
  
  }

  const handleChange = (event) => {
    console.log(event.target.checked)
    setChecked(event.target.checked);
  };

  const getsideNavheatmapData = () => {
    getheatMap().then((res) => {
        setheatmapData(res.data)
    }).catch((err) => {
        console.log(err)
    })
  }


  const getheatmapDailogBox =() =>{
    setChecked(false)
    setHeatMap(true)

  }

  
  React.useEffect(()=> {
    getsideNavheatmapData()
    
  },[])

  const sideMenuIconClick= (menudata) => {
    setHeatMap(true)
    setsideMenu(true)
    setChecked(false)
    setosmHeatMap(menudata)
    setShowMarkerOSM(true)
  };

  
  const heatMapLocation = () => { 
    
    return (
<>
    {<List className="locationlist" >
     
      {heatmapData.map((text,index) =>(
          <ListItem button key={index} onClick={() => sideMenuIconClick(text)}>
            <ListItemText primary={text.heatMapValue} /> 
          </ListItem>
        
          ))
      }
    </List>}
    
</> )
  };

  const handleDialogHeatMap =(data) =>{
    setcity(data)
  }
 
  return (
  
    <div className="Dashboard-container">
      <div className="header">
        <div className="icon" onClick={() => setIsOpened(!isOpened)}>
          {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
        </div>
        <div className="header-title">{' '}bv Maps</div>

        <div sx={{color:'blue' ,marginRight:'5vh'}}>Table
         <Switch {...label}  
         checked ={checked}
         onChange={handleChange}
         />map 
         </div>
      </div>

      <div className="container">

        <aside button className={`${isOpened ? "opened" : ""} drawer`}   ><p onClick={()=> navigate("/openstreetmap")}>Pinned Location</p>
        <p button className={`${isOpened ? "opened" : ""} drawer`}  onClick={getheatmapDailogBox}>Heat Map </p>
        
        {isOpened ? heatMapLocation():null}</aside>
        

        <main className="main">{children}
        
        {checked?<OpenStreetMap showMarker={showMarker}/>
         :heatMap? <HeatMap update={()=>updateAddNew()} handleAddMoreLoc={() =>handleAddMoreLoc()} osmHeatMap={osmHeatMap}/> 
         :sideMenu? <OsmHeatMap menudata={osmHeatMap} showMarkerOSM={showMarkerOSM}/> :<TabularView/> }
        {showAddNew ? <DialogBoxHeatMap  handleDialogHeatMap={handleDialogHeatMap} /> :null} 
       
        </main>
      </div>
      <div className="footer">@bv-maps.com</div>
      
    </div>
  );
};


 