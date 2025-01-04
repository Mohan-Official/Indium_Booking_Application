import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SamMatrix from '../Room Display Matrix/SamMatrix';
import SamCapFilter from '../Filters/SamCapFilter';
import SamFacilityFilter from '../Filters/SamFacilityFilter';
import SamLocationFilter from '../Filters/SamLocationFilter';
import { Box, Button, Skeleton } from '@mui/material';
import CalendarField from '../Calendar Field/CalendarField';

export default function SamCom() {
  const [selectedCapacities, setSelectedCapacities] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('Chennai');
  const [roomsData, setRoomsData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://673247b52a1b1a4ae10f7f9f.mockapi.io/roomdata');
        setRoomsData(response.data); // Set fetched data to state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData(); // Call the fetch function
  }, []);

  const handleCapacityFilter = (selectedCapacities) => {
    setSelectedCapacities(selectedCapacities);
  };

  const handleFacilityFilter = (selectedFacilities) => {
    setSelectedFacilities(selectedFacilities);
  };

  const handleLocationFilter = (selectedLocation) => {
    setSelectedLocation(selectedLocation);
  };

  const handleAllButtonClick = () => {
    setSelectedCapacities([]); // Clear capacity filter
    setSelectedFacilities([]); // Clear facility filter
    // Location filter remains unchanged
  };

  // Filter rooms based on selected capacities, facilities, and location
  const filteredRooms = roomsData.filter((room) => {
    const matchesCapacity = selectedCapacities.length === 0 || 
      selectedCapacities.includes(room.capacity.toString());

    const matchesFacility = selectedFacilities.length === 0 || 
      selectedFacilities.every((facility) => 
        room.facilities.includes(facility)
      );

    const matchesLocation = selectedLocation === '' || 
      room.location === selectedLocation;

    return matchesCapacity && matchesFacility && matchesLocation;
  });

  // Show skeleton loading while data is being fetched
  if (loading) {
    return (
      <Box sx={{ width: '100%', overflowX: 'hidden' }}>
        <Box sx={{ m: 1, width: '113px' }}>
          <Skeleton animation="wave" height='6rem' />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
          {/* Skeleton for "All" Button */}
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={100}
            height="3.5rem"
            sx={{ borderRadius: 0.7 }}
          />
          {/* Skeleton for Capacity Filter */}
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={150}
            height="3.5rem"
            sx={{ borderRadius: 0.7 }}
          />
          {/* Skeleton for Facility Filter */}
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={160}
            height="3.5rem"
            sx={{ borderRadius: 0.7 }}
          />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 5fr', gap: 1, m: 1 }}>
          <Box>
            <Skeleton
              animation="wave"
              variant="rectangular"
              height='360px'
              sx={{ borderRadius: 0.7 }}
            />
          </Box>
          <Box>
            <Skeleton
              animation="wave"
              variant="rectangular"
              height='360px'
              sx={{ borderRadius: 0.7 }}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100%', overflowX: 'hidden', display: 'flex', flexDirection: 'column', }}>
      {/* Filters and Calendar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3,
          flexWrap: 'wrap', // Allow wrapping for smaller screens
        }}
      >
        <SamLocationFilter
          selectedLocation={selectedLocation}
          onFilterChange={handleLocationFilter}
        />
        <CalendarField />
        <Button sx={{position:'absolute', right: '24px', color:'white', backgroundColor:'#000000',borderRadius:'4px',padding:'15px 55px'}}>
          New Booking
        </Button>
      </Box>

      <Box sx={{ backgroundColor:'white', borderRadius:'10px', padding:'20px' }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap',}}>
          <Button
            onClick={handleAllButtonClick}
            sx={{
              padding: '15px 20px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            All
          </Button>
          <SamCapFilter
            selectedCapacities={selectedCapacities}
            onFilterChange={handleCapacityFilter}
          />
          <SamFacilityFilter
            selectedFacilities={selectedFacilities}
            onFilterChange={handleFacilityFilter}
          />
        </Box>

        {/* Room Matrix */}
        <Box sx={{ flexGrow: 1, overflowX: 'auto', width: '100%' }}> {/* Allow horizontal scrolling for the matrix if needed */}
          <SamMatrix rooms={filteredRooms} />
        </Box>
      </Box>
      {/* "All" Button and Filters */}
    </Box>
  );
}