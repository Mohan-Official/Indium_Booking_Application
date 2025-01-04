// import * as React from 'react';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// import { roomsData } from '../RoomsData'; // Adjust the import path as needed

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const SamFacilityFilter = ({ selectedFacilities, onFilterChange }) => {
//   // Extract unique facilities from roomsData
//   const facilities = [...new Set(roomsData.flatMap(room => room.facilities))];

//   // Handle dropdown change
//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     const selectedValues = typeof value === 'string' ? value.split(',') : value;
//     onFilterChange(selectedValues); // Pass selected facilities to parent
//   };

//   return (
//     <div>
//       <FormControl sx={{ m: 1, width: 300 }}>
//         <InputLabel id="facility-multiple-checkbox-label">Facilities</InputLabel>
//         <Select
//           labelId="facility-multiple-checkbox-label"
//           id="facility-multiple-checkbox"
//           multiple
//           value={selectedFacilities}
//           onChange={handleChange}
//           input={<OutlinedInput label="Facilities" />}
//           renderValue={(selected) => selected.join(', ')}
//           MenuProps={MenuProps}
//         >
//           {facilities.map((facility) => (
//             <MenuItem key={facility} value={facility}>
//               <Checkbox checked={selectedFacilities.includes(facility)} />
//               <ListItemText primary={facility} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// };

// export default SamFacilityFilter;

import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Skeleton from '@mui/material/Skeleton'; // Import Skeleton

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const INITIAL_VISIBLE_ITEMS = 3; // Number of skeleton items to show while loading

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SamFacilityFilter = ({ selectedFacilities, onFilterChange }) => {
  const [roomsData, setRoomsData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch data from the API endpoint
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

  // Extract unique facilities from roomsData
  const facilities = [...new Set(roomsData.flatMap(room => room.facilities))];

  // Handle dropdown change
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedValues = typeof value === 'string' ? value.split(',') : value;
    onFilterChange(selectedValues); // Pass selected facilities to parent
  };

  // Show skeleton loading while data is being fetched
  if (loading) {
    return (
      <FormControl sx={{ m: 1, width: 250 }}>
        <InputLabel id="facility-multiple-checkbox-label">Facilities</InputLabel>
        <Select
          labelId="facility-multiple-checkbox-label"
          id="facility-multiple-checkbox"
          multiple
          value={[]}
          input={<OutlinedInput label="Facilities" />}
          renderValue={() => <Skeleton animation="wave" width={100} />} // Skeleton for selected value
          MenuProps={MenuProps}
          disabled // Disable the dropdown while loading
        >
          {[...Array(INITIAL_VISIBLE_ITEMS)].map((_, index) => (
            <MenuItem key={index} sx={{ paddingLeft: 0, paddingTop: 0 }}>
              <Checkbox disabled />
              <ListItemText
                primary={<Skeleton animation="wave" width={150} />} // Skeleton for facility name
                sx={{ paddingTop: 0, paddingBottom: 0 }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 250 }}>
        <InputLabel id="facility-multiple-checkbox-label">Facilities</InputLabel>
        <Select
          labelId="facility-multiple-checkbox-label"
          id="facility-multiple-checkbox"
          multiple
          value={selectedFacilities}
          onChange={handleChange}
          input={<OutlinedInput label="Facilities" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {facilities.map((facility) => (
            <MenuItem key={facility} value={facility}>
              <Checkbox checked={selectedFacilities.includes(facility)} />
              <ListItemText primary={facility} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SamFacilityFilter;