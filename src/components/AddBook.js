import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [price, setPrice] = useState('');
  const [genre, setGenre] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const titleRegex = /^[a-zA-Z\s]+$/;
    const authorRegex = /^[a-zA-Z\s]+$/;

    if (!titleRegex.test(title)) {
      setMessage({ type: 'error', text: 'Title must contain only letters and spaces.' });
      return;
    }

    if (!authorRegex.test(author)) {
      setMessage({ type: 'error', text: 'Author must contain only letters and spaces.' });
      return;
    }


    const newBook = { title, author, publishYear, price, genre };

    try {
      const response = await axios.post('https://book-management-app-36qt.onrender.com/add', newBook);
      setMessage({ type: 'success', text: response.data.message });

      setTitle('');
      setAuthor('');
      setPublishYear('');
      setPrice('');
      setGenre('');
    } catch (err) {
 
      if (err.response) {
        setMessage({ type: 'error', text: err.response.data.message });
      } else {
        setMessage({ type: 'error', text: 'Error adding book' });
      }
    }
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      {message && (
        <div style={{ color: message.type === 'success' ? 'green' : 'red' }}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Author:</label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Publish Year:</label>
          <input 
            type="number" 
            value={publishYear} 
            onChange={(e) => setPublishYear(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Price:</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Genre (Optional):</label>
          <input 
            type="text" 
            value={genre} 
            onChange={(e) => setGenre(e.target.value)} 
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
