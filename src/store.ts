import { createStore } from "redux";

export interface Movie {
  readonly id: number;
  readonly title: string;
  readonly image: string;
  readonly genre: string;
  readonly rating: string;
}

// Define action types
const SET_MOVIES = "SET_MOVIES";
const TOGGLE_WATCHLIST = "TOGGLE_WATCHLIST";

// Define action creators
export const setMovies = (movies: Movie[]) => ({
  type: SET_MOVIES,
  payload: movies,
});

export const toggleWatchlist = (movieId: number) => ({
  type: TOGGLE_WATCHLIST,
  payload: movieId,
});

// Define initial state
const initialState = {
  movies: [] as Movie[],
  watchlist: [] as number[],
};

// Define reducer
interface Action {
  type: string;
  payload?: Movie[] | number;
}

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_MOVIES:
      console.log("SET_MOVIES", action.payload);
      return { ...state, movies: action.payload as Movie[] };
    case TOGGLE_WATCHLIST:
      if (typeof action.payload === "number") {
        return {
          ...state,
          watchlist: state.watchlist.includes(action.payload)
            ? state.watchlist.filter((id) => id !== action.payload)
            : [...state.watchlist, action.payload],
        };
      }
      return state;
    default:
      return state;
  }
};

// Create store
export const store = createStore(reducer);
