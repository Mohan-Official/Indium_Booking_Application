import { Box } from '@mui/material';
import './App.css';
import RoomDisplaySection from './components/RoomDisplaySection';
import Sidebar from './components/SideBar';
import { Container, styled } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

function App() {
  const DashboardContainer = styled(Box)({
    width: '100%',
    height:'100vh',
    display:'flex',
  });

  const DashboardSelectionContainer = styled(Box)({
    height:'100vh',
    width:'83%',
    backgroundColor:'red',
    position:'relative',
    top:0,
    right:0,
    display:'flex',
    flexDirection:'column',
    // justifyContent:'space-between'
  })

  const Appbar = styled(Box)({
    height:'10%',
    width:'100%',
    backgroundColor:'gainsboro'
  })

  const NewMeetingSection = styled(Box)({
    height:'3.91%',
    width:'100%',
    backgroundColor:'yellow'
  })
  
  const RoomCalendarSection = styled(Box)({
    height:'50.98%',
    width:'100%',
    backgroundColor:'green',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'
  })

  const StatusTableSection = styled(Box)({
    height:'28.32%',
    width:'100%',
    backgroundColor:'pink'
  })
  return (
    <>
      {/* <DashboardContainer>
        <section style={{height:'100vh',width:'15%',padding:'1rem',backgroundColor:'navajowhite'}}>
          <Sidebar className='sidebar' />
        </section>
        <DashboardSelectionContainer>
          <RoomDisplaySection />
          <Appbar>

          </Appbar>
          <NewMeetingSection>

          </NewMeetingSection>
          <RoomCalendarSection>
            <RoomDisplaySection />
          </RoomCalendarSection>
          <StatusTableSection>

          </StatusTableSection>
        </DashboardSelectionContainer>
      </DashboardContainer> */}

      <RoomDisplaySection />

    </>
  );
}

export default App;