import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/state/authSlice';
import movieReducer from '../features/movies/state/movieSlice';
import personalizationReducer from '../features/movies/state/personalizationSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        movies: movieReducer,
        personalization: personalizationReducer,
    },
});

export default store;
