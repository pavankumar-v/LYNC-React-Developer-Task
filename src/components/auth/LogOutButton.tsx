import React, { useContext } from 'react';
import Button from '@ui/Button';
import { AuthContext } from '@/contexts/AuthContext';

const LogOutButton: React.FC = () => {
  const { logOutUser } = useContext(AuthContext);
  return (
    <Button onClick={() => logOutUser()} variant="destructive">
      Logout
    </Button>
  );
};

export default LogOutButton;
