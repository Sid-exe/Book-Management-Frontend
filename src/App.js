import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ViewBooks from './components/ViewBooks';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';
import './App.css'; 

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Book Management System</h1>
        </header>
        <nav className="app-nav">
          <ul>
            <li>
              <Link to="/" className="nav-link">View Books</Link>
            </li>
            <li>
              <Link to="/add-book" className="nav-link">Add Book</Link>
            </li>
          </ul>
        </nav>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<ViewBooks />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/update-book/:id" element={<UpdateBook />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>Book Management System</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
