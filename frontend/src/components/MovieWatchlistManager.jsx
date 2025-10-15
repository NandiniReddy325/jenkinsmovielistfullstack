import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./style.css";
import config from './config.js';

const MovieWatchlistManager = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({
    id: '',
    title: '',
    genre: '',
    year: '',
    status: 'Unwatched'
  });
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState('');

  const baseUrl = `${config.url}/movieapi`;

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const fetchAllMovies = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setMovies(res.data);
    } catch (error) {
      setMessage('❌ Failed to fetch movies.');
    }
  };

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!movie.title || !movie.genre || !movie.year) {
      setMessage('⚠ Please fill all required fields.');
      return false;
    }
    return true;
  };

  const addMovie = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, movie);
      setMessage('✅ Movie added successfully!');
      fetchAllMovies();
      resetForm();
    } catch (error) {
      setMessage('❌ Error adding movie.');
    }
  };

  const updateMovie = async () => {
    if (!movie.id) {
      setMessage('⚠ ID is required to update.');
      return;
    }
    try {
      await axios.put(`${baseUrl}/update`, movie);
      setMessage('✅ Movie updated successfully!');
      fetchAllMovies();
      resetForm();
    } catch (error) {
      setMessage('❌ Error updating movie.');
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage('🗑️ Movie removed from list.');
      fetchAllMovies();
    } catch (error) {
      setMessage('❌ Error deleting movie.');
    }
  };

  const handleEdit = (m) => {
    setMovie(m);
    setEditMode(true);
    setMessage(`✏️ Editing movie "${m.title}"`);
  };

  const resetForm = () => {
    setMovie({
      id: '',
      title: '',
      genre: '',
      year: '',
      status: 'Unwatched'
    });
    setEditMode(false);
  };

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="movie-app">
      <h1 className="app-title">My Movie Watchlist</h1>

      {message && (
        <div className={`msg-banner ${message.includes('❌') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="movie-form">
        <h2>{editMode ? 'Edit Movie' : 'Add a New Movie'}</h2>
        <div className="form-inputs">
          <input
            type="text"
            name="title"
            placeholder="🎞 Movie Title"
            value={movie.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="genre"
            placeholder="🎭 Genre"
            value={movie.genre}
            onChange={handleChange}
          />
          <input
            type="number"
            name="year"
            placeholder="📅 Year"
            value={movie.year}
            onChange={handleChange}
          />
          <select name="status" value={movie.status} onChange={handleChange}>
            <option value="Unwatched">Unwatched</option>
            <option value="Watched">Watched</option>
          </select>
        </div>

        <div className="form-buttons">
          {!editMode ? (
            <button className="btn-primary" onClick={addMovie}>➕ Add Movie</button>
          ) : (
            <>
              <button className="btn-success" onClick={updateMovie}>💾 Save Changes</button>
              <button className="btn-secondary" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="movie-list">
        {filteredMovies.length === 0 ? (
          <p className="no-movies">No movies found.</p>
        ) : (
          filteredMovies.map((m) => (
            <div
              key={m.id}
              className={`movie-card ${m.status === 'Watched' ? 'watched' : ''}`}
            >
              <div className="movie-info">
                <h3>{m.title}</h3>
                <p>🎭 {m.genre}</p>
                <p>📅 {m.year}</p>
                <p className={`status ${m.status.toLowerCase()}`}>Status: {m.status}</p>
              </div>
              <div className="movie-actions">
                <button className="btn-edit" onClick={() => handleEdit(m)}>✏ Edit</button>
                <button className="btn-delete" onClick={() => deleteMovie(m.id)}>🗑 Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieWatchlistManager;
