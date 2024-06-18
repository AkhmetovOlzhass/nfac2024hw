import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import defaultAvatar from '../../assets/default-avatar.png';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar'

import Modal from '../../components/modal';
import Song from '../../components/song';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [nowUser, setNowUser] = useState(null);
  const [songs, setSongs] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [currentSongId, setCurrentSongId] = useState()

  const [modalOpen, setModalOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  const handleAddToPlaylistClick = (songId) => {
    setModalOpen(true);
    setCurrentSongId(songId); 
  };

  const {getUserById, getSongsById, artistId, getPlaylists} = useAuth()

  const toggleFavorite = async (songId) => {
    try {
      const response = await axios.put(`https://nfac2024hw-production.up.railway.app/api/v5/songs/${artistId}/favorite`, { songId });
      if (response.status === 200) {
        setNowUser(prev => ({ ...prev, favorites: response.data.favorites }));
      } else {
        console.error('Error updating favorite status:', response.data);
      }
    } catch (error) {
      console.error('Failed to toggle favorite status:', error);
    }
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlists = await getPlaylists();
        setPlaylists(playlists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();

  }, [id]);

  useEffect(() => {
    setIsOwner(id === artistId);
  }, [artistId, id])

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserById(id);
      setUser(userData);
    };

    const fetchSongs = async () => {
        const songsData = await getSongsById(id);
        setSongs(songsData);
      };

    fetchUser();
    fetchSongs();

  }, [id, getUserById, getSongsById]);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserById(artistId);
      setNowUser(userData);
    };

    fetchUser();

  }, [id, getUserById]);


  const onPlaylistSelect = async (playlistId, songId) => {
    try {
      const response = await axios.put(`https://nfac2024hw-production.up.railway.app/api/v5/songs/${playlistId}/add-song`, { songId });
      if (response.status === 200) {
        console.log('Song added to playlist successfully');
        setModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to add song to playlist:', error);
    }
  };

  const handleEditClick = (songId) => {
    navigate(`/editSong/${songId}`);
  };
  const handleEditUserClick = (userId) => {
    navigate(`/editUser/${userId}`);
  };

  const handleDeleteClick = async (songId) => {
    try {
        await axios.delete(`https://nfac2024hw-production.up.railway.app/api/v5/songs/${songId}`);
        setSongs(songs.filter(song => song._id !== songId));
      } catch (error) {
        console.error('Failed to delete song:', error);
      }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (

    <div className="min-h-screen text-gray-300">
    <div className="bg-custom-section md:pl-72 pt-32 p-8">
    <div className="bg-black min-h-screen p-8 text-white">
        <div className="max-w-5xl mx-auto">
            {user ? (
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0">
                <div className=' w-48 h-48 rounded-full shadow-lg overflow-hidden flex items-center'>
                    <img 
                    src={user.avatarUrl || defaultAvatar} 
                    alt="Artist" 
                    className="w-full " 
                    />
                </div>
                <div className="md:ml-8">
                <h1 className="text-4xl font-bold">{user.username}</h1>
                <p className="text-lg mt-2"><strong>Email:</strong> {user.email}</p>
                <p className="text-lg"><strong>Description:</strong> {user.description || "No description provided"}</p>
                {isOwner ? <button
                    onClick={() => handleEditUserClick(user._id)}
                    className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded transition duration-300"
                    >
                        Edit Profile
                    </button> : null}
                </div>
            </div>
            ) : (
            <div>Loading...</div>
            )}
            
            <h2 className="text-3xl font-bold mt-10 mb-4">Songs</h2>
            {songs && songs.length > 0 ? (
                <ul>
                {songs.map((song) => (
                  <Song key={song._id} song={song} isOwner={isOwner} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} handleAddToPlaylistClick={handleAddToPlaylistClick} toggleFavorite={toggleFavorite} favorites={nowUser ? nowUser.favorites : null} />
                  ))}
                  <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} onPlaylistSelect={onPlaylistSelect} songId={currentSongId}>
                    {playlists} 
                  </Modal>
                </ul>
            ) : (
                <p className="text-center p-8">No songs available</p>
            )}
        </div>
        </div>
    </div>
  </div>


  );
};

export default UserDetails;