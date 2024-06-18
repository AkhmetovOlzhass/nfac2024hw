import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://nfac2024hw-production.up.railway.app' : 'http://localhost:5000';
// http://localhost:5000

const AuthContext = createContext(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [username, setUsername] = useState('');
    const [artistId, setArtistId] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            setAuthToken(token);
        } 

        const username = localStorage.getItem('username');
        
        if (username) {
            setUsername(username);
        } 

        const artistId = localStorage.getItem('artistId');
        
        if (artistId) {
            setArtistId(artistId);
        } 
    }, [navigate]);

    const register = async (email, password, username) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/v5/auth/register`, {email, password, username });
            
            console.log(response);
            navigate('/signin'); 
        } catch (error) {
            console.error('Register failed:', error);
            alert('Register failed!');
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/v5/auth/login`, { email, password });
            console.log(response.data);
            const { accessToken, user } = response.data;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('username', user.username);
            localStorage.setItem('artistId', user._id);


            setAuthToken(accessToken);
            
            navigate('/'); 
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed!');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthToken(null);
        navigate('/signin');
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout, register, username, artistId, BASE_URL }}>
            {children}
        </AuthContext.Provider>
    );
};