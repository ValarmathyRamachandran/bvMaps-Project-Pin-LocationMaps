import "./Dashboard.scss";
import React from "react";
import { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import OpenStreetMap from "../../Component/OpenStreetMap";

const Dashboard = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className="Dashboard-container">
      <div className="header">
        <div className="icon" onClick={() => setIsOpened(!isOpened)}>
          {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
        </div>
        <div className="header-title">{' '}bv Maps</div>
      </div>
      <div className="container">
        <aside className={`${isOpened ? "opened" : ""} drawer`}>Maps
        <p className={`${isOpened ? "opened" : ""} drawer`}>Location</p></aside>
        <main className="main">{children}
        <OpenStreetMap />
        </main>
      </div>
      <div className="footer">@bv-maps.com</div>
    </div>
  );
};


  export default Dashboard;