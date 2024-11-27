import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MoviesGrid from "./components/MoviesGrid";
import Watchlist from "./components/Watchlist";
import { setMovies, toggleWatchlist } from './store';
import "./styles.css";

export interface Movie {
  readonly id: number;
  readonly title: string;
  readonly image: string;
  readonly genre: string;
  readonly rating: string;
}

export default function App() {
  const movies = useSelector((state: { movies: Movie[] }) => state.movies);
  const watchlist = useSelector((state: { watchlist: Movie[] }) => state.watchlist);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchMovies() {
      console.log('Fetching movies...');
      const response = await fetch("movies.json");
      dispatch(setMovies(await response.json()));
    }
    fetchMovies();
  }, [dispatch]);

  const handleToggleWatchlist = (movieId: number) => {
    dispatch(toggleWatchlist(movieId));
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <MoviesGrid
                  movies={movies}
                  watchlist={watchlist}
                  toggleWatchlist={handleToggleWatchlist}
                />
              }
            />
            <Route
              path="/watchlist"
              element={
                <Watchlist
                  movies={movies}
                  watchlist={watchlist}
                  toggleWatchlist={handleToggleWatchlist}
                />
              }
            />
          </Routes>
        </Router>
      </div>

      <Footer />
    </div>
  );
}
