// import * as React from 'react';
// import dayjs from 'dayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { Popover, TextField, InputAdornment } from '@mui/material';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import './CalendarField.css'; // Import the CSS file for custom styles

// export default function DateCalendarValue() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [selectedDate, setSelectedDate] = React.useState(dayjs());

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     handleClose();
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'date-calendar-popover' : undefined;

//   // Define the width
//   const width = 250; // Fixed width as per your requirement

//   // Function to check if a date is Sunday
//   const isSunday = (date) => {
//     return dayjs(date).day() === 0; // Sunday is 0 in dayjs
//   };

//   return (
//     <div>
//       {/* Input Field */}
//       <TextField
//         fullWidth
//         onClick={handleClick}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <CalendarTodayIcon />
//             </InputAdornment>
//           ),
//           endAdornment: (
//             <InputAdornment position="end">
//               <ArrowDropDownIcon />
//             </InputAdornment>
//           ),
//           style: { width: width }, // Set the width of the TextField
//         }}
//         value={selectedDate.format('DD MMM YYYY')} // Display selected date
//         readOnly
//         sx={{ width: width }} // Ensure the TextField container has the same width
//       />

//       {/* Calendar Popover */}
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         PaperProps={{
//           style: {
//             width: width, // Set the width of the Popover
//             padding: '0px 8px', // Padding for the Popover
//           },
//         }}
//       >
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DateCalendar
//             value={selectedDate}
//             onChange={handleDateChange}
//             minDate={dayjs()} // Disable past dates
//             maxDate={dayjs().add(90, 'day')} // Allow dates up to 90 days from today
//             disableFuture={false} // Allow future dates within the range
//             showDaysOutsideCurrentMonth // Show days from the previous/next month
//             slots={{
//               day: (props) => {
//                 const { day, outsideCurrentMonth } = props;
//                 const isDaySunday = isSunday(day);
//                 return (
//                   <div
//                     style={{
//                       color: isDaySunday ? 'red' : 'inherit', // Highlight Sundays in red
//                       opacity: outsideCurrentMonth ? 0.5 : 1, // Fade out days outside the current month
//                       textAlign: 'center',
//                       padding: '8px',
//                       cursor: 'pointer',
//                     }}
//                     onClick={() => handleDateChange(day)}
//                   >
//                     {dayjs(day).format('D')}
//                   </div>
//                 );
//               },
//             }}
//           />
//         </LocalizationProvider>
//       </Popover>
//     </div>
//   );
// }

import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TextField, InputAdornment, Popover } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './CalendarField.css'; // Import the CSS file for custom styles

export default function DateCalendarValue() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(dayjs('2024-12-06')); // Default date: 06 Dec 2024

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-calendar-popover' : undefined;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* Input Field */}
      <TextField
        fullWidth
        onClick={handleClick}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <ArrowDropDownIcon />
            </InputAdornment>
          ),
          style: { width: 250 }, // Set the width of the TextField
        }}
        value={selectedDate.format('DD MMM YYYY')} // Display selected date
        readOnly
        sx={{ width: 250 }} // Ensure the TextField container has the same width
      />

      {/* Calendar Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            width: 250, // Set the width of the Popover
            padding: '0px 0px', // Add padding for better spacing
          },
        }}
      >
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          minDate={dayjs()} // Disable past dates
          maxDate={dayjs().add(90, 'day')} // Allow dates up to 90 days from today
          disableFuture={false} // Allow future dates within the range
          showDaysOutsideCurrentMonth // Show days from the previous/next month
        />
      </Popover>
    </LocalizationProvider>
  );
}