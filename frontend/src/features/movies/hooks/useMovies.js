import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import movieApi from '../api/movie.api';
import { setTrending, setPopular, setLoading, setError } from '../state/movieSlice';

export const useMovies = () => {
    const dispatch = useDispatch();
    const { trending, popular, loading, error } = useSelector((state) => state.movies);

    const fetchTrending = useCallback(async () => {
        dispatch(setLoading(true));
        try {
            const data = await movieApi.getTrending();
            dispatch(setTrending(data.content));
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const fetchPopular = useCallback(async (type) => {
        dispatch(setLoading(true));
        try {
            const data = await movieApi.getPopular(type);
            dispatch(setPopular({ type, data: data.content }));
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const getDetails = useCallback(async (type, id) => {
        try {
            return await movieApi.getDetails(type, id);
        } catch (err) {
            console.error(err);
            return null;
        }
    }, []);

    const fetchSearch = useCallback(async (type, query) => {
        dispatch(setLoading(true));
        try {
            const data = await movieApi.search(type, query);
            return data.content;
        } catch (err) {
            dispatch(setError(err.message));
            return [];
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    return {
        trending,
        popular,
        loading,
        error,
        fetchTrending,
        fetchPopular,
        getDetails,
        fetchSearch
    };
};
