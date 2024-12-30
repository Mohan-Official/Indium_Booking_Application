import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

const MultiSelectFilter = ({ options, label, onChange }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (event) => {
    const { value } = event.target;
    const updatedValues = typeof value === "string" ? value.split(",") : value;
    setSelectedValues(updatedValues);
    if (onChange) {
      onChange(updatedValues);
    }
  };

  return (
    <FormControl
      fullWidth
      sx={{
        width: 113, // Fixed width
        height: 32, // Fixed height
      }}
    >
<InputLabel
        id={`${label}-select-label`}
        sx={{
          fontSize: 10, // Smaller font size
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Center label text
          lineHeight: "0px", // Vertically center label text
          color: selectedValues.length === 0 ? "rgba(0, 0, 0, 0.6)" : "inherit", // Placeholder color
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        multiple
        value={selectedValues}
        onChange={handleChange}
        label={label}
        renderValue={(selected) => selected.join(", ")} // Show selected values
        sx={{
          height: 32, // Fixed height for the select field
          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center", // Vertically align content
            justifyContent: "center", // Center content
            padding: "0px 8px", // Adjust padding to fit
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.23)", // Default border color
          },
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 120, // Restrict dropdown height
              width: 113, // Match dropdown width to the select field
            },
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            value={option}
            sx={{
              fontSize: 10, // Smaller font size for menu items
            }}
          >
            <Checkbox
              checked={selectedValues.indexOf(option) > -1}
              sx={{
                padding: 0, // Remove extra padding
                marginLeft: "2px", // Align checkbox properly
              }}
            />
            <ListItemText
              primary={option}
              sx={{
                fontSize: 10, // Adjust font size of text
                marginLeft: "8px", // Space between checkbox and text
              }}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectFilter;