import "./Dashboard.scss";
import React from "react";
import { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import OpenStreetMap from "../../Component/OpenStreetMap";
import Switch from '@mui/material/Switch';
import TabularView from "../../Component/TabluarView/TabluarView";


const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Dashboard = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [checked,setChecked]= useState(true)

  const handleChange = (event) => {
    console.log(event.target.checked)
    setChecked(event.target.checked);
  };


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
        <aside className={`${isOpened ? "opened" : ""} drawer`}>Pinned Location
        <p className={`${isOpened ? "opened" : ""} drawer`}>Heat Map </p></aside>
        <main className="main">{children}
        {checked? <OpenStreetMap /> :<TabularView/>}
        </main>
      </div>
      <div className="footer">@bv-maps.com</div>
    </div>
  );
};


  export default Dashboard;