import React, { useContext } from 'react';
import Button from '@ui/Button';
import { AuthContext } from '@/contexts/AuthContext';

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useContext(AuthContext);

  return <Button onClick={() => loginWithRedirect()}>Login</Button>;
};

export default LoginButton;
