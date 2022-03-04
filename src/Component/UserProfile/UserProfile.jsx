import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { border, padding } from '@mui/system';
import { Link } from "react-router-dom";
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';

export default function UserProfile() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem("email")
    localStorage.removeItem("firstName")
    localStorage.removeItem("lastName")
}

  return (
    <div>
      <Button aria-describedby={id}  onClick={signOut} style={{backgroundColor:'transparent'}}>
      <div className="exit-icon"   > 
      <Link to="/">< ExitToAppTwoToneIcon  style={{ color:'#fc86aa'  }}/></Link></div>
      </Button>
      {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }} */}
      {/* > */}
        {/* <Typography sx={{ p: 2 }}> */}
            {/* <div className='userProfile-icon-container' style={{backgroundColor:'transparent'}} >

              <  CircleRoundedIcon style={{height: '0%',width: '30%', color: 'gray', marginLeft: '22vh' }} />
                <p style={{fontWeight:'500',lineHeight:.2,textAlign:'centre',marginLeft:'18vh'}} >{localStorage.getItem("firstName")}
                {' '}{localStorage.getItem("lastName")}</p>
                <p style={{marginLeft:"22vh" ,textAlign:'centre'}}>{localStorage.getItem("email")}</p>

                <div>
                <Link to="/signin"> <button className='signOut-btn' onClick={signOut} style={{fontWeight:'bold',backgroundColor:'transparent' ,borderColor: 'lightGray' , border:'.5px solid',padding:'10px',marginLeft:'28vh'}}>Sign Out</button></Link>
                </div>
            </div> */}
        {/* </Typography>
      </Popover> */}
    </div>
  );
}
