import React, { useContext } from 'react';
import Button from '@ui/Button';
import { AuthContext, AuthContextType } from '@/contexts/AuthContext';

const LogOutButton: React.FC = () => {
  const { logOutUser } = useContext(AuthContext) as AuthContextType;
  return (
    <Button onClick={() => logOutUser()} variant="destructive">
      Logout
    </Button>
  );
};

export default LogOutButton;
