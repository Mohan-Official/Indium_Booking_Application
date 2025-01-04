import React from 'react';
import './Navbar.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { UserIcon } from 'lucide-react';
import { Box, styled, Typography } from '@mui/material';

const Navbar = () => {
    const ProfileBox = styled(Box)({
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        width:'165px',
        // backgroundColor:'red',
        // padding:'0px 25px'
    })
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">Book Meeting Rooms</a>
        <div className="navbar-menu">
          {/* <img src={NotificationBell}/> */}
            <NotificationsIcon sx={{marginRight:'20px'}} />
            <ProfileBox>
                <UserIcon />
                <Typography variant='p'>
                    Steve Rogers
                </Typography>
                <KeyboardArrowDownIcon />
            </ProfileBox>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;