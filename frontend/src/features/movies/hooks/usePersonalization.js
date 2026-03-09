import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import personalizationApi from '../api/personalization.api';
import { setFavorites, setHistory, setLoading, setError } from '../state/personalizationSlice';

export const usePersonalization = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const { favorites, history, loading, error } = useSelector((state) => state.personalization);

    const fetchFavorites = useCallback(async () => {
        if (!token) return;
        dispatch(setLoading(true));
        try {
            const data = await personalizationApi.getFavorites(token);
            dispatch(setFavorites(data.content));
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, token]);

    const addToFavorites = useCallback(async (movieData) => {
        if (!token) return;
        try {
            await personalizationApi.addFavorite(movieData, token);
            await fetchFavorites(); // Refresh list
        } catch (err) {
            console.error(err);
        }
    }, [token, fetchFavorites]);

    const removeFromFavorites = useCallback(async (movieId) => {
        if (!token) return;
        try {
            await personalizationApi.removeFavorite(movieId, token);
            await fetchFavorites(); // Refresh list
        } catch (err) {
            console.error(err);
        }
    }, [token, fetchFavorites]);

    const fetchHistory = useCallback(async () => {
        if (!token) return;
        dispatch(setLoading(true));
        try {
            const data = await personalizationApi.getHistory(token);
            dispatch(setHistory(data.content));
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, token]);

    const addToHistory = useCallback(async (movieData) => {
        if (!token) return;
        try {
            await personalizationApi.addHistory(movieData, token);
            await fetchHistory(); // Refresh list
        } catch (err) {
            console.error(err);
        }
    }, [token, fetchHistory]);

    const deleteFromHistory = useCallback(async (historyId) => {
        if (!token) return;
        try {
            await personalizationApi.deleteHistoryItem(historyId, token);
            await fetchHistory(); // Refresh list
        } catch (err) {
            console.error(err);
        }
    }, [token, fetchHistory]);

    return {
        favorites,
        history,
        loading,
        error,
        fetchFavorites,
        addToFavorites,
        removeFromFavorites,
        fetchHistory,
        addToHistory,
        deleteFromHistory
    };
};
