import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useLogout() {
  const { setAuthState } = useContext(AuthContext);

  function logout() {
    setAuthState({
      email: null,
      accessToken: null,
      authenticated: false,
    });

    localStorage.removeItem('email');
    localStorage.removeItem('accessToken');
  }

  return logout;
}
