import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Create a context for login data
const LoginDataContext = createContext();

// Provider component for login data
const LoginDataProvider = ({ children }) => {

  // State to store login data
  const [loginData, setLoginData] = useState(null);

  // Load login data from local storage on component mount
  useEffect(() => {
    const storedLoginData = localStorage.getItem('loginData');

    if (storedLoginData) {
      setLoginData(JSON.parse(storedLoginData));
    }
  }, []);

  // Update login data and store it in local storage
  const updateLoginData = (newLoginData) => {
    setLoginData(newLoginData);

    localStorage.setItem('loginData', JSON.stringify(newLoginData));
  };

  return (
    // Provide login data and update function to children components
    <LoginDataContext.Provider value={{ loginData, updateLoginData }}>
      {children}
    </LoginDataContext.Provider>
  );
};

LoginDataProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { LoginDataContext, LoginDataProvider };