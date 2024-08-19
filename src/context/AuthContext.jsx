import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import { instance as axios } from '../config/axios';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    email: null,
    accessToken: null,
    authenticated: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    const loadToken = async () => {
      const email = localStorage.getItem('email');
      const accessToken = localStorage.getItem('accessToken');

      if (email && accessToken && !ignore) {
        try {
          const response = await axios.post('/verify', {
            accessToken,
          });

          console.log(response);

          if (response.status === 200) {
            setAuthState({ email, accessToken, authenticated: true });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    loadToken();

    return () => (ignore = true);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
