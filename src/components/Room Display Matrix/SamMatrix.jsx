import React, { useRef, useState } from 'react';
import './SamMatrixStyle.css'; // Import the CSS file
import { Box, Tooltip } from '@mui/material';
import { Presentation, Projector, Wifi } from 'lucide-react';
import PersonIcon from '@mui/icons-material/Person';

const generateTimeSlots = () => {
    return Array.from({ length: 13 }, (_, i) => {
      const hour = i + 9; // Start from 9 AM
      return `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? 'pm' : 'am'}`;
    });
  };

const SamMatrix = ({ rooms }) => {
  const containerRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const timeSlots = generateTimeSlots();

  // Function to handle slot selection
  const handleSlotClick = (roomId, time) => {
    const existingSelection = selectedSlots.find(
      (slot) => slot.roomId === roomId && slot.time === time
    );

    if (existingSelection) {
      setSelectedSlots(selectedSlots.filter(
        (slot) => !(slot.roomId === roomId && slot.time === time)
      ));
    } else {
      setSelectedSlots([...selectedSlots, { roomId, time }]);
    }
  };

  // Check if a slot is selected
  const isSlotSelected = (roomId, time) => {
    return selectedSlots.some((slot) => slot.roomId === roomId && slot.time === time);
  };

  // Handle booking
  const handleBooking = () => {
    if (selectedSlots.length === 0) return;

    const room = rooms.find((r) => r.id === selectedSlots[0].roomId);
    if (!room) return;

    const timeRange = selectedSlots.map((slot) => slot.time).join(', ');
    alert(`Room: ${room.roomname}\nTime: ${timeRange}`);
  };

  return (
    <div className="matrix-container">
      <div className="matrix-wrapper">
        {/* Fixed first cell (top-left corner) */}
        <div className="header-cell fixed-cell">
          <h3>Meeting Room List</h3>
        </div>
  
        {/* Fixed first row (time slots) */}
        <div
          className="header-row"
          style={{ transform: `translateX(-${scrollLeft}px)` }}
        >
          <div className="time-slots">
            {timeSlots.map((time) => (
              <div key={time} className="time-slot">
                {time}
              </div>
            ))}
          </div>
        </div>
  
        {rooms.length === 0 ? (
          <div className="no-rooms-message">
            No rooms available
          </div>
        ) : (
          <>
            {/* Fixed first column (room names) */}
            <div
              className="room-column"
              style={{ transform: `translateY(-${scrollTop}px)` }}
            >
              {rooms.map((room) => (
                <div key={room.id} className="room-info">
                  <div className="room-info-content">
                    <div className="room-info-sub-content">
                      <span className="room-name">{room.roomname}</span>
                      <span style={{ paddingLeft: '5px' }}>
                        {room.facilities.map((facility, index) => {
                          switch (facility.toLowerCase()) {
                            case 'wlan':
                              return (
                                <Tooltip title="WLAN" key={index}>
                                  <Wifi style={{ height: '12px', marginRight: '4px' }} />
                                </Tooltip>
                              );
                            case 'video conference':
                              return (
                                <Tooltip title="Video Conference" key={index}>
                                  <Projector style={{ height: '12px', marginRight: '4px' }} />
                                </Tooltip>
                              );
                            case 'white board':
                              return (
                                <Tooltip title="White Board" key={index}>
                                  <Presentation style={{ height: '12px', marginRight: '4px' }} />
                                </Tooltip>
                              );
                            default:
                              return null;
                          }
                        })}
                      </span>
                    </div>
                    <div className="room-capacity">
                      <PersonIcon style={{ height: '15px' }} />
                      {room.capacity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
  
            {/* Scrollable content */}
            <div
              ref={containerRef}
              className="matrix-content"
              onScroll={(e) => {
                setScrollLeft(e.currentTarget.scrollLeft);
                setScrollTop(e.currentTarget.scrollTop);
              }}
            >
              <div className="content-wrapper">
                <div className="content-grid">
                  {rooms.map((room, index) => (
                    <div key={room.id} className="room-row">
                      {timeSlots.map((time) => (
                        <div
                          key={`${room.id}-${time}`}
                          className={`time-cell ${isSlotSelected(room.id, time) ? 'selected' : ''}`}
                          onClick={() => handleSlotClick(room.id, time)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Next button */}
            <div className="button-container">
              <button
                onClick={handleBooking}
                disabled={selectedSlots.length === 0}
                className={`next-button ${selectedSlots.length === 0 ? 'disabled' : ''}`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SamMatrix;