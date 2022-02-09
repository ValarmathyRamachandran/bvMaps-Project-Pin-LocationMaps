import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import OpenStreetMap from './Component/OpenStreetMap';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useRoutes
} from "react-router-dom";

function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={ <SignIn/> } />
        <Route path= "/dashboard" element= {<Dashboard />} />
        {/* <Route path="/" element={ <SignUp/> } /> */}
        <Route path="/openstreetmap" element={ <OpenStreetMap/> } />
    </Routes>
    </Router>
    
    
  );
}






export default App;


 
