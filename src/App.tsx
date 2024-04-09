import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
  // Navigate,
  // Outlet,
} from 'react-router-dom';
import Books from './components/pages/Books';
import Bookmarks from './components/pages/Bookmarks';
import BookInfo from './components/pages/BookInfo';

const App: React.FC = () => {
  return (
    <div className="text-primary min-h-screen max-w-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/auth" element={<>Login</>} />
          <Route element={<Books />} path="/books" />
          <Route element={<BookInfo />} path="/books/:id" />
          <Route element={<Bookmarks />} path="/bookmarks" />
          <Route element={<Books />} path="/cart" />
          <Route element={<Books />} path="/orders" />
          {/* <Route element={<></>}> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
