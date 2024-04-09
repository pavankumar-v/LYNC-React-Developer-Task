import React, { FormEvent } from 'react';
import Button from '../ui/Button';
import useToggle from '@/hooks/useToggle';
import EyeIcon from '@/assets/icons/EyeIcon';
import EyeCloseIcon from '@/assets/icons/EyeCloseIcon';

const LoginPage: React.FC = () => {
  const [showPassword, toggleShowPassword] = useToggle(false);

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e.currentTarget.email.value);
    console.log(e.currentTarget.password.value);
  }
  return (
    <div className="container w-full h-full flex justify-center items-center">
      <div className="bg-card p-6 rounded-xl border border-primary/50 w-1/2">
        <h2 className="text-4xl font-bold">Login</h2>
        <p className="text-sm text-foreground/60 mt-1">
          Login Using Email & Password
        </p>

        <div className="flex flex-col gap-4 mt-5">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                id="email"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <div className="flex gap-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter password"
                  id="password"
                />
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleShowPassword();
                  }}
                >
                  {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="mt-4">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
