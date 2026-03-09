import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/auth.api';
import { setUser, setLoading, setError } from '../state/authSlice';

export const useAuth = () => {
    const [localLoading, setLocalLoading] = useState(false);
    const [localError, setLocalError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signup = async (userData) => {
        setLocalLoading(true);
        setLocalError(null);
        dispatch(setLoading(true));
        try {
            const data = await authApi.signup(userData);
            localStorage.setItem('token', data.token);
            dispatch(setUser(data.user));
            navigate('/');
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Signup failed';
            setLocalError(message);
            dispatch(setError(message));
            return { success: false, message };
        } finally {
            setLocalLoading(false);
            dispatch(setLoading(false));
        }
    };

    const login = async (credentials) => {
        setLocalLoading(true);
        setLocalError(null);
        dispatch(setLoading(true));
        try {
            const data = await authApi.login(credentials);
            localStorage.setItem('token', data.token);
            dispatch(setUser(data.user));
            navigate('/');
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed';
            setLocalError(message);
            dispatch(setError(message));
            return { success: false, message };
        } finally {
            setLocalLoading(false);
            dispatch(setLoading(false));
        }
    };

    return { signup, login, loading: localLoading, error: localError };
};
