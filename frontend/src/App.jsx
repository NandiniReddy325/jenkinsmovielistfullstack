import React from "react";
import MovieWatchlistManager from "./components/MovieWatchlistManager";
import "./components/style.css";

function App() {
  return (
    <div className="app-container">
      <h1>🎬 My Movie Bucket List</h1>
      <MovieWatchlistManager />
    </div>
  );
}

export default App;
