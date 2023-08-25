import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";

function App() {
  const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=ee0fc38d";
  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();  // Added 'await' here
    setMovies(data.Search);  // Set the movies using 'setMovies'
  };

  useEffect(() => {
    searchMovies('Spiderman');
  }, []);

  return (
    <div className="app">
      <h1>MovieMania</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search For Movies"
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}  // Call searchMovies with input value
        />
        <img src={SearchIcon} alt="logo" onClick={() => searchMovies(searchTerm)} />
      </div>

      {/* Check if movies array is not empty */}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
