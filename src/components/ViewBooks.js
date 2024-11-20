import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get('https://book-management-app-36qt.onrender.com/books')  
      .then((response) => {
        setBooks(response.data); 
        setLoading(false); 
      })
      .catch((err) => {
        setError('Error fetching books');
        setLoading(false); 
        console.error(err);
      });
  }, []); 

  // Handle book deletion
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (confirmDelete) {
      axios
        .delete(`https://book-management-app-36qt.onrender.com/books/${id}/delete`)  // Backend endpoint to delete book by ID
        .then((response) => {
          setBooks(books.filter((book) => book._id !== id));
          alert('Book deleted successfully');
        })
        .catch((err) => {
          setError('Error deleting book');
          console.error(err);
        });
    }
  };

 
  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Books List</h2>
      <ul className="book-list">
        {books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          books.map((book) => (
            <li key={book._id}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Published Year: {book.publishYear}</p>
              <p>Price: ${book.price}</p>
              <button onClick={() => navigate(`/update-book/${book._id}`)}>Update</button>
              <button onClick={() => handleDelete(book._id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ViewBooks;
