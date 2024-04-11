import React, { useContext } from 'react';
import Button from '@ui/Button';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/types';

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useContext(
    AuthContext
  ) as AuthContextType as AuthContextType;

  return <Button onClick={() => loginWithRedirect()}>Login</Button>;
};

export default LoginButton;
