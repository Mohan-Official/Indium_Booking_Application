// import * as React from 'react';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import { roomsData } from '../RoomsData';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 141,
//     },
//     sx: {
//         '& .MuiList-root': {
//           paddingTop: 0,
//           paddingBottom: 0,
//         },
//       },
//   },
// };

// const SamLocationFilter = ({ selectedLocation, onFilterChange }) => {
//   // Extract unique locations from roomsData
//   const locations = [...new Set(roomsData.map(room => room.location))];

//   // Handle dropdown change
//   const handleChange = (event) => {
//     const selectedValue = event.target.value;
//     onFilterChange(selectedValue); // Pass selected location to parent
//   };

//   return (
//     <div>
//       <FormControl sx={{ m: 1, width: 141 }}>
//         <InputLabel id="location-single-select-label">Location</InputLabel>
//         <Select
//           labelId="location-single-select-label"
//           id="location-single-select"
//           value={selectedLocation}
//           onChange={handleChange}
//           input={<OutlinedInput label="Location" />}
//           MenuProps={MenuProps}
//         >
//           {locations.map((location) => (
//             <MenuItem key={location} value={location}>
//               {location}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// };

// export default SamLocationFilter;

import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton'; // Import Skeleton

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 141,
    },
    sx: {
      '& .MuiList-root': {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  },
};

const SamLocationFilter = ({ selectedLocation, onFilterChange }) => {
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://673247b52a1b1a4ae10f7f9f.mockapi.io/roomdata');
        setRoomsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Extract unique locations from roomsData
  const locations = [...new Set(roomsData.map(room => room.location))];

  // Handle dropdown change
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onFilterChange(selectedValue); // Pass selected location to parent
  };

  // Show skeleton loading while data is being fetched
  if (loading) {
    return (
      <FormControl sx={{ m: 1, width: 141 }}>
        <InputLabel id="location-single-select-label">Location</InputLabel>
        <Select
          labelId="location-single-select-label"
          id="location-single-select"
          value=""
          input={<OutlinedInput label="Location" />}
          MenuProps={MenuProps}
          disabled // Disable the dropdown while loading
          renderValue={() => <Skeleton animation="wave" width={100} />} // Skeleton for selected value
        >
          {[...Array(3)].map((_, index) => (
            <MenuItem key={index} sx={{ paddingLeft: 0, paddingTop: 0 }}>
              <Skeleton animation="wave" width={100} /> {/* Skeleton for location name */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 141 }}>
        <InputLabel id="location-single-select-label">Location</InputLabel>
        <Select
          labelId="location-single-select-label"
          id="location-single-select"
          value={selectedLocation}
          onChange={handleChange}
          input={<OutlinedInput label="Location" />}
          MenuProps={MenuProps}
        >
          {locations.map((location) => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SamLocationFilter;