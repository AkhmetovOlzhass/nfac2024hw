import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PlayPauseButton from '../../components/PlayPause';
import Modal from '../../components/modal';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Song from '../../components/song';

const Playlist = () => {
    const { id } = useParams();
    const { getPlaylists, getSongById, artistId, getUserById } = useAuth();

    const [modalOpen, setModalOpen] = useState(false);
    const [playlistSongs, setPlaylistSongs] = useState([]);
    const [allPlaylists, setAllPlaylists] = useState([]);
    const [currentSongId, setCurrentSongId] = useState(null);
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const toggleFavorite = async (songId) => {
      try {
        const response = await axios.put(`http://localhost:5000/api/v5/songs/${artistId}/favorite`, { songId });
        if (response.status === 200) {
          setUser(prev => ({ ...prev, favorites: response.data.favorites }));
        } else {
          console.error('Error updating favorite status:', response.data);
        }
      } catch (error) {
        console.error('Failed to toggle favorite status:', error);
      }
    };

    const handleAddToPlaylistClick = (songId) => {
        setModalOpen(true);
        setCurrentSongId(songId);
    };

    const onPlaylistSelect = async (playlistId, songId) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/v5/songs/${playlistId}/add-song`, { songId });
            if (response.status === 200) {
                console.log('Song added to playlist successfully');
                setModalOpen(false);
            }
        } catch (error) {
            console.error('Failed to add song to playlist:', error);
            setError(error);
        }
    };

    useEffect(() => {
        const fetchPlaylistSongs = async () => {
            try {
                const playlists = await getPlaylists();
                setAllPlaylists(playlists);
                
                if (playlists) {
                    const foundPlaylist = playlists.find(playlist => playlist._id === id);
                    const songs = await Promise.all(foundPlaylist.songs.map(songId => getSongById(songId)));
                    setPlaylistSongs(songs);
                }
            } catch (error) {
                console.error("Error fetching playlist songs:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylistSongs();

        return () => {
            setLoading(false);
            setError(null);
            setPlaylistSongs([]);
        };
    }, [id, getPlaylists, getSongById]);

    useEffect(() => {
      const fetchUser = async () => {
        const userData = await getUserById(artistId);
        console.log(userData);
        setUser(userData);
      };
  
      fetchUser();
  
    }, [id, getUserById]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading playlist: {error.message}</div>;

  return (
    <div className="min-h-screen text-gray-300">
      <div className="bg-custom-section md:pl-72 pt-32 p-8">
        <div className="bg-black min-h-screen p-8 text-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mt-10 mb-4">Songs</h2>
            {playlistSongs && playlistSongs.length > 0 ? (
              <ul>
                {playlistSongs.map((song) => (
                  <Song key={song._id} song={song} isOwner={null} handleDeleteClick={null} handleEditClick={null} handleAddToPlaylistClick={handleAddToPlaylistClick} toggleFavorite={toggleFavorite} favorites={user ? user.favorites : null} />
                ))}
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} onPlaylistSelect={onPlaylistSelect} songId={currentSongId}>
                    {allPlaylists} 
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

export default Playlist