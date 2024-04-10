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
import AuthContextProvider, { AuthContext } from './contexts/AuthContext';
import Spinner from './components/ui/Spinner';

const App: React.FC = () => {
  return (
    <div className="text-primary min-h-screen max-w-screen">
      <BrowserRouter>
        <AuthContextProvider>
          <Navbar />
          <Routes>
            <Route element={<LoginPage />} path="/auth/login" />
            <Route element={<Books />} path="/books" />
            <Route element={<BookInfo />} path="/books/:id" />
            <Route element={<Books />} path="/cart" />
            <Route element={<Books />} path="/orders" />
            <Route element={<AuthProtected />}>
              <Route element={<Bookmarks />} path="/bookmarks" />
            </Route>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
};

const AuthProtected: React.FC = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  console.log(isAuthenticated);

  if (isLoading) {
    <Spinner>Loading...</Spinner>;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to={'/auth/login'} />;
};

export default App;
