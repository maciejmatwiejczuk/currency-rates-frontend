import { useState } from 'react';
import { useContext } from 'react';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LinkMaterial from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email: data.get('email'),
        password: data.get('password'),
      });

      if (response.status === 200) {
        const {
          user: { email },
          accessToken,
        } = response.data;

        setAuthState({ email, accessToken, authenticated: true });
        localStorage.setItem('email', email);
        localStorage.setItem('accessToken', accessToken);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      const { msg: errorMsg } = error.response.data;

      setLoginError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={loginError ? true : false}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            helperText={loginError}
          />
          <TextField
            error={loginError ? true : false}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={loginError}
          />
          <Button
            disabled={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link to="/register">
              <LinkMaterial variant="body2">
                {"Don't have an account? Sign Up"}
              </LinkMaterial>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
