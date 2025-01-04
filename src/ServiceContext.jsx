// import React, { createContext, useState } from 'react';

// export const serviceContext = createContext();

// export const ServiceProvider = ({ children }) => {
//   const [items, setItems] = useState([]);

//   const toggleItem = (item) => {
//     setItems((prevItems) => {
//       // If the item already exists, remove it
//       if (prevItems.includes(item)) {
//         return prevItems.filter((i) => i !== item);
//       }
//       // Otherwise, add it
//       return [...prevItems, item];
//     });
//   };

//   return (
//     <serviceContext.Provider value={{ items, toggleItem }}>
//       {children}
//     </serviceContext.Provider>
//   );
// };

import React, { createContext, useState } from 'react';

export const serviceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [capacities, setCapacities] = useState([]); // State for capacities
  const [facilities, setFacilities] = useState([]); // State for facilities

  // Toggle capacity values
  const toggleCapacity = (capacity) => {
    setCapacities((prevCapacities) => {
      if (prevCapacities.includes(capacity)) {
        return prevCapacities.filter((c) => c !== capacity);
      }
      return [...prevCapacities, capacity];
    });
  };

  // Toggle facility values
  const toggleFacility = (facility) => {
    setFacilities((prevFacilities) => {
      if (prevFacilities.includes(facility)) {
        return prevFacilities.filter((f) => f !== facility);
      }
      return [...prevFacilities, facility];
    });
  };

  return (
    <serviceContext.Provider value={{ capacities, facilities, toggleCapacity, toggleFacility }}>
      {children}
    </serviceContext.Provider>
  );
};