import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
interface Movie {
  id: number;
  title: string;
  image: string;
  genre: string;
  rating: string;
}

interface AppState {
  movies: Movie[];
  watchlist: number[];
}

const initialState: AppState = {
  movies: [],
  watchlist: [],
};

// Create a slice
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
    },
    toggleWatchlist(state, action: PayloadAction<number>) {
      const movieId = action.payload;
      if (state.watchlist.includes(movieId)) {
        state.watchlist = state.watchlist.filter((id) => id !== movieId);
      } else {
        state.watchlist.push(movieId);
      }
    },
  },
});

// Export actions
export const { setMovies, toggleWatchlist } = moviesSlice.actions;

// Configure store with DevTools options
const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
  },
  devTools: {
    name: "Movie App",
    trace: true,
    traceLimit: 25,
  },
});

export default store;
