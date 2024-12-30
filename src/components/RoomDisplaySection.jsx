import { Box, Button, styled } from '@mui/material';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import MultiSelectFilter from './common/MultiSelectFilter';
import RoomsMatrix from './Rooms Display/RoomsMatrix';
import Filter from './common/Dropdown/Filter';
import { roomsData } from '../RoomsData';

export default function RoomDisplaySection() {
  const [selectedCapacities, setSelectedCapacities] = useState(['2', '4', '16']);
  const [selectedFacilities, setSelectedFacilities] = useState(['wlan']);

  const DisplayContainer = styled(Box)({
    height: '522px',
    width: '85%',
    borderRadius: '10px',
    padding: '20px',
  });

  const TopCategoriesSection = styled(Box)({
    height: '15%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  });

  const FilterFieldSection = styled(Box)({
    width: '380px',
    height: '32px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  });

  const CreateBookingBtn = styled(Button)({
    height: '40px',
    minWidth: '212px',
    backgroundColor: '#000000',
    borderRadius: '4px',
    padding: '10px 55px',
  });

  const capacities = ['2', '4', '6', '8', '12', '16', '20'];
  const facilities = ['White Board', 'WLAN', 'Video Conference'];

  const handleCapacityChange = (selectedCapacity) => {
    setSelectedCapacities(selectedCapacity);
    console.log("Selected Capacities:", selectedCapacity);
  };

  const handleFacilityChange = (selectedFacilities) => {
    setSelectedFacilities(selectedFacilities);
    console.log("Selected Facilities:", selectedFacilities);
  };

  return (
    <DisplayContainer>
      <TopCategoriesSection>
        <FilterFieldSection>
          <Button sx={{ height: '100%', width: '43px', backgroundColor: 'khaki', borderRadius: '4px' }}>
            All
          </Button>
          <Box sx={{ width: '113px', height: '100%', border: '1px solid #8888883D', borderRadius: '4px' }}>
            <Filter
              options={capacities}
              label="Capacity"
              size="113px"
              onChange={handleCapacityChange}
            />
          </Box>
          <Box sx={{ width: '180px', height: '100%', border: '1px solid #8888883D', borderRadius: '4px' }}>
            <Filter
              options={facilities}
              label="Facilities"
              size="180px"
              onChange={handleFacilityChange}
            />
          </Box>
        </FilterFieldSection>
        <CreateBookingBtn>
          <Plus />
          Create Booking
        </CreateBookingBtn>
      </TopCategoriesSection>
      <Box sx={{ height: '85%', width: '100%' }}>
        <RoomsMatrix 
          roomsData={roomsData} 
          facilityFilter={selectedFacilities} 
          capacityFilter={selectedCapacities} 
        />
      </Box>
    </DisplayContainer>
  );
}