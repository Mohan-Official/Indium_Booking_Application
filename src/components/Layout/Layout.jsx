import React from 'react';
import { Box, Drawer, Toolbar, CssBaseline } from '@mui/material';
import Sidebar from '../Side Bar/SideBar'; // Import your Sidebar component
import SamCom from '../Rooms Availability Calendar/SamCom'; // Import your SamCom component

const drawerWidth = 240;

function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {/* <Toolbar />  */}
        {/* Spacing for AppBar */}
        <Sidebar /> 
        {/* Your Sidebar component */}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar /> {/* Spacing for AppBar */}
        <SamCom /> {/* Your SamCom component */}
      </Box>
    </Box>
  );
}

export default Layout;