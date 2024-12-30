import React, { useRef, useState } from 'react';
import './RoomDisplaySection.css';
import { Box, Tooltip } from '@mui/material';
import { Presentation, Projector, UserRound, Wifi } from 'lucide-react';
import PersonIcon from '@mui/icons-material/Person';

const generateTimeSlots = () => {
  return Array.from({ length: 15 }, (_, i) => {
    const hour = i + 8;
    return `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? 'pm' : 'am'}`;
  });
};

const getTimeValue = (time) => {
  const hour = parseInt(time.replace(/[ap]m/, ''));
  const isPM = time.includes('pm');
  return hour + (isPM && hour !== 12 ? 12 : 0);
};

const formatTimeRange = (times) => {
  if (times.length === 0) return '';
  if (times.length === 1) return times[0];

  const sortedTimes = times.sort((a, b) => getTimeValue(a) - getTimeValue(b));
  const ranges = [];
  let currentRange = [sortedTimes[0]];

  for (let i = 1; i < sortedTimes.length; i++) {
    const currentTime = getTimeValue(sortedTimes[i]);
    const prevTime = getTimeValue(sortedTimes[i - 1]);

    if (currentTime - prevTime === 1) {
      currentRange.push(sortedTimes[i]);
    } else {
      ranges.push([...currentRange]);
      currentRange = [sortedTimes[i]];
    }
  }
  ranges.push(currentRange);

  const formattedRanges = ranges.map(range => 
    range.length > 1 ? `${range[0]} - ${range[range.length - 1]}` : range[0]
  );

  return formattedRanges.join(', ');
};

function RoomDisplaySection({ roomsData }) {
  const containerRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const timeSlots = generateTimeSlots();

  const handleScroll = (e) => {
    setScrollLeft(e.currentTarget.scrollLeft);
    setScrollTop(e.currentTarget.scrollTop);
  };

  const handleSlotClick = (roomId, time) => {
    const existingSelection = selectedSlots.find(
      slot => slot.roomId === roomId && slot.time === time
    );

    if (existingSelection) {
      setSelectedSlots(selectedSlots.filter(
        slot => !(slot.roomId === roomId && slot.time === time)
      ));
    } else {
      setSelectedSlots([...selectedSlots, { roomId, time }]);
    }
  };

  const isSlotSelected = (roomId, time) => {
    return selectedSlots.some(slot => slot.roomId === roomId && slot.time === time);
  };

  const handleBooking = () => {
    if (selectedSlots.length === 0) return;

    const room = roomsData.find(r => r.id === selectedSlots[0].roomId);
    if (!room) return;

    const timeRange = formatTimeRange(selectedSlots.map(slot => slot.time));
    alert(`Room: ${room.name}\nTime: ${timeRange}`);
  };

  return (
    <div className="matrix-container">
      <div className="matrix-wrapper">
        <div className="header-cell">
          <h3>Meeting Room List</h3>
        </div>
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

        <div 
          className="room-column"
          style={{ transform: `translateY(-${scrollTop}px)` }}
        >
          {roomsData.map((room) => (
            <div key={room.id} className="room-info">
              <div className="room-info-content">
                <div className='room-info-sub-content'>
                  <span className="room-name">{room.roomname}</span>
                  <span style={{ paddingLeft: '5px' }}>
                    {room.facilities.map((facility, index) => {
                      switch (facility.toLowerCase()) {
                        case 'wlan':
                          return <Tooltip title="wlan" key={index}>
                                    <Wifi style={{ height: '12px', marginRight: '4px' }} />
                                  </Tooltip>
                        case 'video conference':
                          return <Tooltip title="Video Conference" key={index}>
                                    <Projector style={{ height: '12px', marginRight: '4px' }} />
                                  </Tooltip>
                        case 'white board':
                          return <Tooltip title="white board" key={index}>
                                    <Presentation key={index} style={{ height: '12px', marginRight: '4px' }} />
                                  </Tooltip>
                        default:
                          return null;
                      }
                    })}
                  </span>
                </div>
                <div className="room-capacity"><PersonIcon style={{height:'15px'}} />{room.capacity}</div>
              </div>
            </div>
          ))}
        </div>

        <div 
          ref={containerRef}
          className="matrix-content"
          onScroll={handleScroll}
        >
          <div className="content-wrapper">
            <div className="content-grid">
              {roomsData.map((room) => (
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

        <div className="button-container">
          <button
            onClick={handleBooking}
            disabled={selectedSlots.length === 0}
            className={`next-button ${selectedSlots.length === 0 ? 'disabled' : ''}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomDisplaySection;