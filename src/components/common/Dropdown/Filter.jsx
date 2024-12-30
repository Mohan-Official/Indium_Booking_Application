import * as React from 'react';
import './Filter.css';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@mui/material';
import { ChevronDown } from 'lucide-react';

export default function Filter({ options, label, size, handleCapacityMethod }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (value) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];
  
    setSelectedValues(updatedValues);
    console.log("from child:", updatedValues);
  };

  const toggleOptions = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-container" style={{width:`${size}`}} ref={dropdownRef}>
      <div className="custom-select" onClick={toggleOptions}>
        <div className="selected-values">
            {selectedValues.join(', ') || label}
            <ChevronDown style={{height:'15px'}} />
        </div>
        {isOpen && (
          <div className="options-container">
            {options.map((option, index) => (
              <div
                key={index}
                className="option"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange(option);
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={() => handleChange(option)}
                />
                <span className="option-content">{option}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
