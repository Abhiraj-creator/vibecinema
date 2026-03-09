import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trending: [],
    popular: {
        movie: [],
        tv: []
    },
    loading: false,
    error: null,
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setTrending: (state, action) => {
            state.trending = action.payload;
        },
        setPopular: (state, action) => {
            const { type, data } = action.payload;
            state.popular[type] = data;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setTrending, setPopular, setLoading, setError } = movieSlice.actions;
export default movieSlice.reducer;
