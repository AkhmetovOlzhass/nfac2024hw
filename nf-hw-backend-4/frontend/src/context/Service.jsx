import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ServiceContext = createContext(undefined);

export const useService = () => {
    const context = useContext(ServiceContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const ServiceProvider = ({ children }) => {

    const {authToken, login, logout, register, username, artistId, BASE_URL} = useAuth()

    const getUsers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v5/users/users`);
            return response.data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const getUserById = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v5/users/${id}`);
            return response.data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const getSongsById = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v5/songs/${id}`);
            return response.data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    const getSongById = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v5/songs/playlist/${id}`);
            return response.data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const getPlaylists = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v5/songs/playlists`);
            return response.data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const getAllSongs = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v5/songs/songs`);
            return response.data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const toggleFavorite = async (songId) => {
        try {
          const response = await axios.put(`${BASE_URL}/api/v5/songs/${artistId}/favorite`, { songId });
          if (response.status === 200) {
            return response;
          } else {
            console.error('Error updating favorite status:', response.data);
          }
        } catch (error) {
          console.error('Failed to toggle favorite status:', error);
        }
    };

    const onPlaylistSelect = async (playlistId, songId) => {
        try {
          const response = await axios.put(`${BASE_URL}/api/v5/songs/${playlistId}/add-song`, { songId });
          return response;
        } catch (error) {
          console.error('Failed to add song to playlist:', error);
        }
      };

      const deleteClick = async (songId) => {
        try {
            await axios.delete(`${BASE_URL}/api/v5/songs/${songId}`);
          } catch (error) {
            console.error('Failed to delete song:', error);
          }
      };

      const updateUser = async (id, formData) => {
        try {
            await axios.put(`${BASE_URL}/api/v5/users/${id}`, formData);
          } catch (error) {
            console.error('Failed to delete song:', error);
          }
      };

      const updateSong = async (id, formData) => {
        try {
            await axios.put(`${BASE_URL}/api/v5/songs/${id}`, formData);
          } catch (error) {
            console.error('Failed to delete song:', error);
          }
      };

      const createPlaylist = async (formData) => {
        try {
            await axios.post(`${BASE_URL}/api/v5/songs/playlist`, formData);
          } catch (error) {
            console.error('Failed to delete song:', error);
          }
      };
      const createSong = async (formData) => {
        try {
            await axios.post(`${BASE_URL}/api/v5/songs/upload`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
          } catch (error) {
            console.error('Failed to delete song:', error);
          }
      };

    return (
        <ServiceContext.Provider value={{ getUserById, getSongsById, getUsers, getPlaylists, getSongById, getAllSongs, BASE_URL, toggleFavorite, authToken, login, logout, register, username, artistId, onPlaylistSelect, deleteClick, updateUser, updateSong, createPlaylist, createSong }}>
            {children}
        </ServiceContext.Provider>
    );
};