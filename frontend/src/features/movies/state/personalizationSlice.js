import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: [],
    history: [],
    loading: false,
    error: null,
};

const personalizationSlice = createSlice({
    name: 'personalization',
    initialState,
    reducers: {
        setFavorites: (state, action) => {
            state.favorites = action.payload;
        },
        setHistory: (state, action) => {
            state.history = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setFavorites, setHistory, setLoading, setError } = personalizationSlice.actions;
export default personalizationSlice.reducer;
