import React, { createContext, useContext, useState } from 'react';

const EmployeeContext = createContext();

export const ChatProvider = ({ children }) => {
  const [employeeData, setEmployeeData] = useState(null);

  return React.createElement(
    EmployeeContext.Provider,
    { value: { employeeData, setEmployeeData } },
    children
  );
};

export const useEmployeeContext = () => {
  return useContext(EmployeeContext);
};
