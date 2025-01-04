// import React from 'react';
// import { Box, Drawer, Toolbar, CssBaseline, Container } from '@mui/material';
// import Sidebar from '../Side Bar/SideBar'; // Import your Sidebar component
// import SamCom from '../Rooms Availability Calendar/SamCom'; // Import your SamCom component
// import ReservationUpComing from '../Reservation Table/ReservationUpComing'; // Import your ReservationUpComing component
// import Navbar from '../Nav Bar/Navbar'; // Import your Navbar component

// const drawerWidth = 240;

// function Layout() {
//   return (
//     <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
//       <CssBaseline />
      
//       {/* Sidebar */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
//         }}
//       >
//         <Toolbar /> {/* Spacing for AppBar */}
//         <Sidebar /> {/* Your Sidebar component */}
//       </Drawer>

//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           bgcolor: 'background.default',
//           width: `calc(100% - ${drawerWidth}px)`, // Ensure main content does not overflow
//           overflow: 'hidden', // Prevent overflow
//           display: 'flex',
//           flexDirection: 'column', // Stack children vertically
//         }}
//       >
//         {/* Navbar at the top */}
//         <Box sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
//           <Navbar />
//         </Box>

//         {/* SamCom Component */}
//         <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
//           <Container maxWidth="xl" sx={{ mb: 4 }}>
//             <SamCom />
//           </Container>
//         </Box>

//         {/* ReservationUpComing Component at the bottom */}
//         <Box sx={{ position: 'sticky', bottom: 0, zIndex: 1000, bgcolor: 'background.default' }}>
//           <Container maxWidth="xl" sx={{ p: 3 }}>
//             <ReservationUpComing />
//           </Container>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default Layout;

import React from 'react';
import { Box, Drawer, Toolbar, CssBaseline, Container } from '@mui/material';
import Sidebar from '../Side Bar/SideBar'; // Import your Sidebar component
import SamCom from '../Rooms Availability Calendar/SamCom'; // Import your SamCom component
import ReservationUpComing from '../Reservation Table/ReservationUpComing'; // Import your ReservationUpComing component
import Navbar from '../Nav Bar/Navbar'; // Import your Navbar component

const drawerWidth = 240;

function Layout() {
  return (
    <Box sx={{ display: 'flex', height: 'auto', overflow: 'hidden' }}>
      <CssBaseline />
      
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            backgroundColor: '#111827', // Sidebar background color
          },
        }}
      >
        <Toolbar /> {/* Spacing for AppBar */}
        <Sidebar /> {/* Your Sidebar component */}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#F1F1F1',
          width: `calc(100% - ${drawerWidth}px)`, // Ensure main content does not overflow
          overflow: 'hidden', // Prevent overflow
          display: 'flex',
          flexDirection: 'column', // Stack children vertically
        }}
      >
        {/* Navbar at the top */}
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
          <Navbar />
        </Box>

        {/* SamCom Component */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto', // Allow vertical scrolling if needed
            p: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <SamCom /> {/* SamCom takes up the remaining space */}
        </Box>

        {/* ReservationUpComing Component at the bottom */}
        <Box sx={{ position: 'sticky', bottom: 0, zIndex: 1000, }}>
          <Container maxWidth="xl" sx={{ p: 3 }}>
            <ReservationUpComing />
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;