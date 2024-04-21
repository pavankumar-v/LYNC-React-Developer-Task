import React, { useContext } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import Books from './components/pages/Books';
import Bookmarks from './components/pages/Bookmarks';
import BookInfo from './components/pages/BookInfo';
import LoginPage from './components/pages/LoginPage';
import Cart from './components/pages/Cart';
import Orders from './components/pages/Orders';
import AppContextProvider from './contexts/AppContext';
import { AuthContext } from './contexts/AuthContext';
import { AuthContextType } from '@/types';
import Spinner from './components/ui/Spinner';

const App: React.FC = () => {
  return (
    <div className="text-primary min-h-screen max-w-screen">
      <BrowserRouter>
        <AppContextProvider>
          <Navbar />
          <Routes>
            <Route element={<LoginPage />} path="/auth/login" />
            <Route element={<Books />} path="/" />
            <Route element={<Books />} path="/books" />
            <Route element={<BookInfo />} path="/books/:id" />
            <Route element={<AuthProtected />}>
              <Route element={<Bookmarks />} path="/bookmarks" />
              <Route element={<Cart />} path="/cart" />
              <Route element={<Orders />} path="/orders" />
            </Route>
          </Routes>
        </AppContextProvider>
      </BrowserRouter>
    </div>
  );
};

const AuthProtected: React.FC = () => {
  const { isAuthenticated, isLoadingUser } = useContext(
    AuthContext
  ) as AuthContextType;

  if (isLoadingUser) {
    return <Spinner>Verifying Authentication...</Spinner>;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to={'/auth/login'} />;
};

export default App;
