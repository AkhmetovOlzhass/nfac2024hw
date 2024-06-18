import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
            const response = await axios.post('http://localhost:5000/api/v5/auth/register', {email, password, username });
            
            console.log(response);
            navigate('/signin'); 
        } catch (error) {
            console.error('Register failed:', error);
            alert('Register failed!');
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v5/auth/login', { email, password });
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

    const getUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v5/users/users`);
            return response.data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const getUserById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v5/users/${id}`);
            return response.data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const getSongsById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v5/songs/${id}`);
            return response.data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    const getSongById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v5/songs/playlist/${id}`);
            return response.data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const getPlaylists = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v5/songs/playlists`);
            return response.data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const getAllSongs = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v5/songs/songs`);
            return response.data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout, register, username, artistId, getUserById, getSongsById, getUsers, getPlaylists, getSongById, getAllSongs }}>
            {children}
        </AuthContext.Provider>
    );
};