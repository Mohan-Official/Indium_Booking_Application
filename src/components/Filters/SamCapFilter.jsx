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
import './SamFilterStyle.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const INITIAL_VISIBLE_ITEMS = 3;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * INITIAL_VISIBLE_ITEMS + ITEM_PADDING_TOP,
      width: 113,
    },
  },
  sx: {
    '& .MuiList-root': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
};

const SamCapFilter = ({ selectedCapacities, onFilterChange }) => {
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

  // Extract unique capacities from roomsData and sort them
  const capacities = [...new Set(roomsData.map(room => room.capacity))].sort((a, b) => a - b);

  // Handle dropdown change
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedValues = typeof value === 'string' ? value.split(',') : value;
    onFilterChange(selectedValues); // Pass selected capacities to parent
  };

  // Show skeleton loading while data is being fetched
  if (loading) {
    return (
      <div>
        <FormControl sx={{ m: 1, width: '113px' }}>
          <InputLabel id="capacity-multiple-checkbox-label">Capacity</InputLabel>
          <Select
            labelId="capacity-multiple-checkbox-label"
            id="capacity-multiple-checkbox"
            multiple
            value={[]}
            input={<OutlinedInput label="Capacity" />}
            renderValue={() => <Skeleton animation="wave" width={80} />}
            MenuProps={MenuProps}
            disabled // Disable the dropdown while loading
          >
            {[...Array(INITIAL_VISIBLE_ITEMS)].map((_, index) => (
              <MenuItem key={index} sx={{ paddingLeft: 0, paddingTop: 0 }}>
                <Checkbox disabled />
                <ListItemText
                  primary={<Skeleton animation="wave" width={50} />}
                  sx={{ paddingTop: 0, paddingBottom: 0 }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: '113px' }}>
        <InputLabel id="capacity-multiple-checkbox-label">Capacity</InputLabel>
        <Select
          labelId="capacity-multiple-checkbox-label"
          id="capacity-multiple-checkbox"
          multiple
          value={selectedCapacities}
          onChange={handleChange}
          input={<OutlinedInput label="Capacity" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {capacities.map((capacity) => (
            <MenuItem
              key={capacity}
              value={capacity.toString()}
              sx={{
                paddingLeft: 0,
                paddingTop: 0,
              }}
            >
              <Checkbox checked={selectedCapacities.includes(capacity.toString())} />
              <ListItemText primary={capacity} sx={{ paddingTop: 0, paddingBottom: 0 }} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SamCapFilter;