import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBook = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    author: '',
    publishYear: '',
    price: '',
    genre: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

 
  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${id}`) // Backend endpoint to get book by ID
      .then((response) => {
        setBook(response.data); 
        setLoading(false); 
      })
      .catch((err) => {
        setError('Error fetching book details');
        setLoading(false);
        console.error(err);
      });
  }, [id]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value
    }));
  };

  // Handle form submission (Update book)
  const handleSubmit = (e) => {
    e.preventDefault();


    const updatedBookData = {
      title: book.title,
      author: book.author,
      publishYear: parseInt(book.publishYear, 10), 
      price: parseFloat(book.price), 
      genre: book.genre
    };

    axios
      .put(`http://localhost:5000/books/${id}/update`, updatedBookData) 
      .then((response) => {
        
        setMessage('Book updated successfully!'); 
        setTimeout(() => {
          navigate('/'); 
        }, 3000);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setError(err.response.data.message); 
        } else {
          setError('Error updating book'); 
        }
        console.error(err);
      });
  };

  if (loading) {
    return <p>Loading book details...</p>;
  }

  return (
    <div>
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="publishYear">Publish Year:</label>
          <input
            type="number"
            id="publishYear"
            name="publishYear"
            value={book.publishYear}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={book.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={book.genre}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Book</button>
      </form>
      {/* Show error or success message below the form */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default UpdateBook;
