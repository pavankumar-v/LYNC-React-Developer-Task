import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Books from './components/pages/Books';
import Bookmarks from './components/pages/Bookmarks';
import BookInfo from './components/pages/BookInfo';
import LoginPage from './components/pages/LoginPage';
import AuthContextProvider from './contexts/AuthContext';

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
            <Route element={<Bookmarks />} path="/bookmarks" />
            <Route element={<Books />} path="/cart" />
            <Route element={<Books />} path="/orders" />
            {/* <Route element={<></>}> */}
            {/* </Route> */}
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
