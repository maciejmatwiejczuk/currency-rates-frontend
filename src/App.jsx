import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Container component="main" sx={{ paddingY: 6 }}>
          <Outlet />
        </Container>
      </AuthProvider>
    </>
  );
}

export default App;
