import { useContext } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';

import { AuthContext } from '../context/AuthContext';
import { useLogout } from '../hooks/useLogout';

export default function NavBar() {
  const {
    authState: { authenticated },
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const logout = useLogout();

  function renderPageLabel() {
    switch (pathname) {
      case '/':
        return 'Dashboard';

      case '/login':
        return 'Login';

      case '/register':
        return 'Register';
    }
  }

  function renderButtons() {
    if (authenticated) {
      return (
        <Button color="inherit" onClick={() => logout()}>
          Log Out
        </Button>
      );
    }

    return (
      <>
        <Button color="inherit" onClick={() => navigate('/')}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={() => navigate('/login')}>
          Log In
        </Button>
        <Button color="inherit" onClick={() => navigate('/register')}>
          Register
        </Button>
      </>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {renderPageLabel()}
          </Typography>
          {renderButtons()}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
