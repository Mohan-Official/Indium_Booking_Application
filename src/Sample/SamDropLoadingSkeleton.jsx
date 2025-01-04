import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Skeleton from '@mui/material/Skeleton';

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

const SkeletonDropdown = ({ placeholder, loading, options, value, onChange }) => {
  return (
    <FormControl sx={{ m: 1, width: '113px' }}>
      <InputLabel id={`${placeholder.toLowerCase()}-multiple-checkbox-label`}>
        {placeholder}
      </InputLabel>
      <Select
        labelId={`${placeholder.toLowerCase()}-multiple-checkbox-label`}
        id={`${placeholder.toLowerCase()}-multiple-checkbox`}
        multiple
        value={loading ? [] : value}
        onChange={onChange}
        input={<OutlinedInput label={placeholder} />}
        renderValue={(selected) => {
          if (loading) {
            return <Skeleton animation="wave" width={80} />;
          }
          return selected.join(', ');
        }}
        MenuProps={MenuProps}
        disabled={loading}
      >
        {loading
          ? [...Array(INITIAL_VISIBLE_ITEMS)].map((_, index) => (
              <MenuItem key={index} sx={{ paddingLeft: 0, paddingTop: 0 }}>
                <Checkbox disabled />
                <ListItemText
                  primary={<Skeleton animation="wave" width={50} />}
                  sx={{ paddingTop: 0, paddingBottom: 0 }}
                />
              </MenuItem>
            ))
          : options.map((option) => (
              <MenuItem
                key={option}
                value={option.toString()}
                sx={{ paddingLeft: 0, paddingTop: 0 }}
              >
                <Checkbox checked={value.includes(option.toString())} />
                <ListItemText primary={option} sx={{ paddingTop: 0, paddingBottom: 0 }} />
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  );
};

export default SkeletonDropdown;